import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import LegalLayout from "./components/layout/LegalLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import Home from "./pages/Home";
import Search from "./pages/Search";
import VideoDetail from "./pages/VideoDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import LikedVideos from "./pages/LikedVideos";
import History from "./pages/History";
import Collections from "./pages/Collections";
import Subscribers from "./pages/Subscribers";

import ChannelLayout from "./pages/channel/ChannelLayout";
import ChannelVideos from "./pages/channel/ChannelVideos";
import ChannelPlaylists from "./pages/channel/ChannelPlaylists";
import ChannelTweets from "./pages/channel/ChannelTweets";
import ChannelSubscribed from "./pages/channel/ChannelSubscribed";

import PlaylistDetail from "./pages/playlist/PlaylistDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="watch/:videoId" element={<VideoDetail />} />
        <Route path="support" element={<Support />} />

        <Route path="channel/:username" element={<ChannelLayout />}>
          <Route index element={<ChannelVideos />} />
          <Route path="playlist" element={<ChannelPlaylists />} />
          <Route path="tweets" element={<ChannelTweets />} />
          <Route path="subscribed" element={<ChannelSubscribed />} />
        </Route>

        <Route path="playlist/:playlistId" element={<PlaylistDetail />} />

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="liked-videos" element={<LikedVideos />} />
          <Route path="history" element={<History />} />
          <Route path="collections" element={<Collections />} />
          <Route path="subscribers" element={<Subscribers />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<LegalLayout />}>
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
