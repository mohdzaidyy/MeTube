import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Spinner from "../common/Spinner";
import { changeCurrentPassword } from "../../api/userApi";
import { getErrorMessage } from "../../api/axiosClient";

export default function ChangePasswordTab() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const newPassword = watch("newPassword");

  const onSubmit = async (values) => {
    try {
      await changeCurrentPassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success("Password updated successfully");
      reset();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div>
      <h2 className="font-display text-base font-semibold text-zinc-100">Password</h2>
      <p className="mt-1 text-sm text-zinc-500">
        Please enter your current password to change your password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 max-w-lg space-y-4" noValidate>
        <div>
          <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Current password
          </label>
          <input
            id="currentPassword"
            type="password"
            placeholder="Current password"
            className="input-field"
            {...register("currentPassword", { required: "Current password is required" })}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-xs text-red-400">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-zinc-300">
            New password
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="New password"
            className="input-field"
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 8, message: "Must be more than 8 characters" },
            })}
          />
          <p className="mt-1 text-xs text-zinc-500">Your new password must be more than 8 characters.</p>
          {errors.newPassword && <p className="mt-1 text-xs text-red-400">{errors.newPassword.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            className="input-field"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-1">
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting && <Spinner size={14} />}
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
