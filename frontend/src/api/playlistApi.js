import axiosClient from "./axiosClient";

export const createPlaylist = (payload) =>
  axiosClient.post("/playlist", payload);

export const updatePlaylist = (playlistId, payload) =>
  axiosClient.patch(`/playlist/${playlistId}`, payload);

export const deletePlaylist = (playlistId) =>
  axiosClient.delete(`/playlist/${playlistId}`);

export const addVideoToPlaylist = (videoId, playlistId) =>
  axiosClient.patch(`/playlist/add/${videoId}/${playlistId}`);

export const removeVideoFromPlaylist = (videoId, playlistId) =>
  axiosClient.patch(`/playlist/remove/${videoId}/${playlistId}`);

export const getPlaylistById = (playlistId) =>
  axiosClient.get(`/playlist/${playlistId}`);

export const getUserPlaylists = (userId) =>
  axiosClient.get(`/playlist/user/${userId}`);
