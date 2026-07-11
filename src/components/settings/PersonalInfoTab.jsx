import { useState } from "react";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";
import Avatar from "../common/Avatar";
import Spinner from "../common/Spinner";
import { updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../../api/userApi";
import { getErrorMessage } from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import { resolveMediaUrl } from "../../utils/media";

export default function PersonalInfoTab() {
  const { user, updateUserInPlace } = useAuth();
  const [fullName, setFullName] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast.error("Both fields are required");
      return;
    }
    setIsSaving(true);
    try {
      const { data } = await updateAccountDetails({ fullName: fullName.trim(), email: email.trim() });
      updateUserInPlace(data.data);
      toast.success("Personal info updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingAvatar(true);
    try {
      const { data } = await updateUserAvatar(file);
      updateUserInPlace(data.data);
      toast.success("Avatar updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingCover(true);
    try {
      const { data } = await updateUserCoverImage(file);
      updateUserInPlace(data.data);
      toast.success("Cover image updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsUploadingCover(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-base font-semibold text-zinc-100">Personal Info</h2>
      <p className="mt-1 text-sm text-zinc-500">Update your photo and personal details.</p>

      <div className="mt-5 flex flex-wrap items-center gap-6">
        <div className="relative">
          <Avatar src={user?.avatar} name={user?.fullname || user?.username} size="xl" />
          <label className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600">
            {isUploadingAvatar ? <Spinner size={12} /> : <Camera size={13} />}
            <input type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
          </label>
        </div>

        <div className="min-w-[220px] flex-1">
          <p className="mb-2 text-sm font-medium text-zinc-300">Cover image</p>
          <div className="relative h-20 w-full max-w-xs overflow-hidden rounded-lg bg-base-raised">
            {resolveMediaUrl(user?.coverImage) && (
              <img src={resolveMediaUrl(user.coverImage)} alt="" className="h-full w-full object-cover" />
            )}
            <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
              {isUploadingCover ? <Spinner size={16} /> : <Camera size={18} className="text-white" />}
              <input type="file" accept="image/*" className="sr-only" onChange={handleCoverChange} />
            </label>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="mt-6 max-w-lg space-y-4">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Full name
          </label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="flex justify-end gap-3 pt-1">
          <button type="submit" disabled={isSaving} className="btn-primary">
            {isSaving && <Spinner size={14} />}
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
