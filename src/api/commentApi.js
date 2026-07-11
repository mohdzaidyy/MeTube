import axiosClient from "./axiosClient";

export const getVideoComments = (videoId, params = {}) =>
  axiosClient.get(`/comments/${videoId}`, { params });

export const addComment = (videoId, content) =>
  axiosClient.post(`/comments/${videoId}`, { content });

export const updateComment = (commentId, content) =>
  axiosClient.patch(`/comments/c/${commentId}`, { content });

export const deleteComment = (commentId) =>
  axiosClient.delete(`/comments/c/${commentId}`);
