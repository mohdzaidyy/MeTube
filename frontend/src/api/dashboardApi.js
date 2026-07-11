import axiosClient from "./axiosClient";

export const getChannelStats = () => axiosClient.get("/dashboard/stats");

export const getChannelVideos = () => axiosClient.get("/dashboard/videos");
