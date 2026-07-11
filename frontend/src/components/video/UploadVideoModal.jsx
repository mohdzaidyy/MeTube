import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { UploadCloud, FileVideo, CheckCircle2, X } from "lucide-react";
import Modal from "../common/Modal";
import Spinner from "../common/Spinner";
import { publishAVideo } from "../../api/videoApi";
import { getErrorMessage } from "../../api/axiosClient";

const STAGE = { FORM: "form", UPLOADING: "uploading", SUCCESS: "success" };

export default function UploadVideoModal({ isOpen, onClose, onUploaded }) {
  const [stage, setStage] = useState(STAGE.FORM);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const reset = () => {
    setStage(STAGE.FORM);
    setVideoFile(null);
    setThumbnailFile(null);
    setTitle("");
    setDescription("");
    setProgress(0);
  };

  const handleClose = () => {
    if (stage === STAGE.UPLOADING) return; // prevent closing mid-upload
    reset();
    onClose();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return toast.error("Please select a video file");
    if (!thumbnailFile) return toast.error("Please choose a thumbnail");
    if (!title.trim() || !description.trim()) return toast.error("Title and description are required");

    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnailFile);
    formData.append("title", title.trim());
    formData.append("description", description.trim());

    setStage(STAGE.UPLOADING);
    setProgress(0);
    try {
      const { data } = await publishAVideo(formData, (evt) => {
        if (evt.total) setProgress(Math.round((evt.loaded / evt.total) * 100));
      });
      setStage(STAGE.SUCCESS);
      onUploaded?.(data.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
      setStage(STAGE.FORM);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        stage === STAGE.FORM
          ? "Upload video"
          : stage === STAGE.UPLOADING
          ? "Uploading video..."
          : "Uploaded video"
      }
      description={
        stage === STAGE.FORM
          ? "Your video will be private until you publish it."
          : "Track your video uploading process."
      }
      size="md"
      closeOnBackdrop={stage !== STAGE.UPLOADING}
    >
      {stage === STAGE.FORM && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
              isDragging ? "border-brand-500 bg-brand-500/5" : "border-base-border"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
              <UploadCloud size={22} />
            </div>
            {videoFile ? (
              <p className="flex items-center gap-2 text-sm text-zinc-200">
                <FileVideo size={16} /> {videoFile.name}
              </p>
            ) : (
              <>
                <p className="text-sm font-medium text-zinc-200">
                  Drag and drop a video file to upload
                </p>
                <p className="text-xs text-zinc-500">MP4, WebM or MOV — private until you publish.</p>
              </>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary mt-2 !py-2 !px-4 text-sm"
            >
              Select file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="sr-only"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">Thumbnail *</label>
            <label className="btn-secondary w-fit cursor-pointer !py-2 text-sm">
              {thumbnailFile ? thumbnailFile.name : "Choose file"}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div>
            <label htmlFor="upload-title" className="mb-1.5 block text-sm font-medium text-zinc-300">
              Title *
            </label>
            <input
              id="upload-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="Give your video a title"
            />
          </div>

          <div>
            <label htmlFor="upload-desc" className="mb-1.5 block text-sm font-medium text-zinc-300">
              Description *
            </label>
            <textarea
              id="upload-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="input-field"
              placeholder="Tell viewers about your video"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={handleClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      )}

      {stage === STAGE.UPLOADING && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border border-base-border p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
              <FileVideo size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-zinc-200">{videoFile?.name}</p>
              <p className="text-xs text-zinc-500">
                {videoFile ? `${(videoFile.size / (1024 * 1024)).toFixed(1)} MB` : ""}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-raised">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <Spinner size={16} />
          </div>
          <div className="flex justify-end gap-3">
            <button className="btn-secondary" disabled>
              Cancel
            </button>
            <button className="btn-primary" disabled>
              <Spinner size={14} /> Uploading...
            </button>
          </div>
        </div>
      )}

      {stage === STAGE.SUCCESS && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border border-base-border p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
              <FileVideo size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-zinc-200">{videoFile?.name}</p>
              <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                <CheckCircle2 size={13} /> Uploaded successfully
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button className="btn-secondary" onClick={handleClose}>
              <X size={14} /> Close
            </button>
            <button className="btn-primary" onClick={handleClose}>
              Finish
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
