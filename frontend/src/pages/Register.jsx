import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Mail, AtSign, Lock, ImagePlus, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/axiosClient";
import Spinner from "../components/common/Spinner";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onAvatarChange = (e) => {
    const file = e.target.files?.[0];
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  };

  const onCoverChange = (e) => {
    const file = e.target.files?.[0];
    setCoverPreview(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("email", values.email);
      formData.append("username", values.username.toLowerCase());
      formData.append("password", values.password);
      if (values.avatar?.[0]) formData.append("avatar", values.avatar[0]);
      if (values.coverImage?.[0]) formData.append("coverImage", values.coverImage[0]);

      await registerUser(formData);
      toast.success("Account created — please log in");
      navigate("/login");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="card-surface p-6 sm:p-8 animate-fade-in">
      <h1 className="font-display text-xl font-bold text-zinc-100">Create your account</h1>
      <p className="mt-1 text-sm text-zinc-500">Join Metube and start sharing videos.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        {/* Cover + avatar picker */}
        <div>
          <div className="relative h-28 w-full overflow-hidden rounded-lg bg-base-raised">
            {coverPreview && (
              <img src={coverPreview} alt="Cover preview" className="h-full w-full object-cover" />
            )}
            <label
              htmlFor="coverImage"
              className="absolute right-2 top-2 flex cursor-pointer items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-black/80"
            >
              <ImagePlus size={14} /> Cover
            </label>
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              className="sr-only"
              {...register("coverImage")}
              onChange={(e) => {
                register("coverImage").onChange(e);
                onCoverChange(e);
              }}
            />

            <label
              htmlFor="avatar"
              className="absolute -bottom-6 left-4 flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-base-surface bg-brand-gradient text-white"
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
              ) : (
                <User size={22} />
              )}
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="sr-only"
              {...register("avatar", { required: "Profile photo is required" })}
              onChange={(e) => {
                register("avatar").onChange(e);
                onAvatarChange(e);
              }}
            />
          </div>
          <div className="mt-8">
            {errors.avatar && <p className="text-xs text-red-400">{errors.avatar.message}</p>}
            {!errors.avatar && (
              <p className="text-xs text-zinc-500">
                Tap the circle to add a profile photo (required) and the corner icon for a cover image.
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fullname" className="mb-1.5 block text-sm font-medium text-zinc-300">
              Full name
            </label>
            <div className="relative">
              <User size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                id="fullname"
                type="text"
                placeholder="React Patterns"
                className="input-field pl-9"
                {...register("fullname", { required: "Full name is required" })}
              />
            </div>
            {errors.fullname && <p className="mt-1 text-xs text-red-400">{errors.fullname.message}</p>}
          </div>

          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-zinc-300">
              Username
            </label>
            <div className="relative">
              <AtSign size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                id="username"
                type="text"
                placeholder="reactpatterns"
                className="input-field pl-9"
                {...register("username", {
                  required: "Username is required",
                  pattern: { value: /^[a-zA-Z0-9_.]+$/, message: "Letters, numbers, _ and . only" },
                })}
              />
            </div>
            {errors.username && <p className="mt-1 text-xs text-red-400">{errors.username.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Email address
          </label>
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="input-field pl-9"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              className="input-field pl-9 pr-9"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Must be at least 8 characters" },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting && <Spinner size={16} />}
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-brand-400 hover:text-brand-300">
          Log in
        </Link>
      </p>
    </div>
  );
}
