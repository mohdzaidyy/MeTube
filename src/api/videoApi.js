import axiosClient from "./axiosClient";

export const getAllVideos = (params = {}) =>
  axiosClient.get("/videos", { params });

export const publishAVideo = (formData, onUploadProgress) =>
  axiosClient.post("/videos", formData, { onUploadProgress });

export const getVideoById = (videoId) =>
  axiosClient.get(`/videos/v/${videoId}`);

export const updateVideo = (videoId, formData) =>
  axiosClient.patch(`/videos/v/${videoId}`, formData);

export const deleteVideo = (videoId) =>
  axiosClient.delete(`/videos/v/${videoId}`);

export const togglePublishStatus = (videoId) =>
  axiosClient.patch(`/videos/toggle/publish/${videoId}`);
