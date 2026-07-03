import asyncHandler from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from  "../utils/apiResponse.js";



const registerUser = asyncHandler(async (req, res) => {
    // Getting user details from FrontEnd
    const {fullname, email, username, password} = req.body
    console.log( "email", email )

    // validation - not empty
    if([fullname, email, username, password].some((field) => field.trim?.trim()=== "")){
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists
    const existedUser = await User.findOne({
        $or : [{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(409, "User already exists")
    }

    // Check for Images - avatar and coverImage
    const avatarLocalPath = req.files?.avatar[0]?.avatarLocalPath;

    let coverImageLocalPath;
    if( req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    // Uploading on Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    // Create User object
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || " ",
        email,
        password,
        username: username.toLowerCase()
    })

    // remove password and refreshToken from the response
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    // Check for User creation
    if(!createdUser){
        throw new ApiError(400, "Something went wrong while registering the user")
    }

    // Return response
    res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

export { registerUser };