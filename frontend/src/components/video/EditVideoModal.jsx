import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
import Spinner from "../common/Spinner";
import { updateVideo } from "../../api/videoApi";
import { getErrorMessage } from "../../api/axiosClient";
import { resolveMediaUrl } from "../../utils/media";

export default function EditVideoModal({ isOpen, onClose, video, onUpdated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && video) {
      setTitle(video.title || "");
      setDescription(video.description || "");
      setThumbnailFile(null);
      setPreview(resolveMediaUrl(video.thumbnail));
    }
  }, [isOpen, video]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
      const { data } = await updateVideo(video._id, formData);
      toast.success("Video updated");
      onUpdated?.(data.data);
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  if (!video) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit video"
      description="Update your video's details."
      footer={
        <>
          <button className="btn-secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSubmit} disabled={isSaving}>
            {isSaving && <Spinner size={14} />}
            Save changes
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-300">Thumbnail *</label>
          <label className="block aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-dashed border-base-border bg-base-raised">
            {preview ? (
              <img src={preview} alt="Thumbnail preview" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                Choose a thumbnail
              </div>
            )}
            <input type="file" accept="image/*" className="sr-only" onChange={handleThumbnailChange} />
          </label>
        </div>

        <div>
          <label htmlFor="edit-title" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Title *
          </label>
          <input
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="edit-desc" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Description *
          </label>
          <textarea
            id="edit-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="input-field"
          />
        </div>
      </form>
    </Modal>
  );
}
