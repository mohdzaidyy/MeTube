import axiosClient from "./axiosClient";

export const toggleSubscription = (channelId) =>
  axiosClient.post(`/subscriptions/c/${channelId}`);

export const getUserChannelSubscribers = (channelId) =>
  axiosClient.get(`/subscriptions/u/${channelId}`);

export const getSubscribedChannels = (subscriberId) =>
  axiosClient.get(`/subscriptions/subscriptions/${subscriberId}`);
