import axiosClient from "./axiosClient";

// Note: Content-Type is intentionally left unset for FormData requests —
// the browser/axios sets "multipart/form-data; boundary=..." automatically.
// Setting it manually strips the boundary and breaks multer parsing.
export const registerUser = (formData) => axiosClient.post("/users/register", formData);

export const loginUser = (payload) => axiosClient.post("/users/login", payload);

export const logoutUser = () => axiosClient.post("/users/logout");

export const refreshAccessToken = () => axiosClient.post("/users/refresh-token");

export const changeCurrentPassword = (payload) =>
  axiosClient.post("/users/change-password", payload);

export const getCurrentUser = () => axiosClient.get("/users/current-user");

export const updateAccountDetails = (payload) =>
  axiosClient.patch("/users/update-account-details", payload);

export const updateUserAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  return axiosClient.patch("/users/avatar", formData);
};

export const updateUserCoverImage = (file) => {
  const formData = new FormData();
  formData.append("coverImage", file);
  return axiosClient.patch("/users/cover-image", formData);
};

export const getUserChannelProfile = (username) =>
  axiosClient.get(`/users/c/${username}`);

export const getWatchHistory = () => axiosClient.get("/users/history");
