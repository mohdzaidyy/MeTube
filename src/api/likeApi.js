import axiosClient from "./axiosClient";

export const toggleVideoLike = (videoId) =>
  axiosClient.post(`/likes/toggle/v/${videoId}`);

export const toggleCommentLike = (commentId) =>
  axiosClient.post(`/likes/toggle/c/${commentId}`);

export const toggleTweetLike = (tweetId) =>
  axiosClient.post(`/likes/toggle/t/${tweetId}`);

export const getLikedVideos = () => axiosClient.get("/likes/videos");
