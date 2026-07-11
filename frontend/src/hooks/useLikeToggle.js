import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function useLikeToggle({ id, initialLiked, initialCount, toggleFn }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(Boolean(initialLiked));
  const [count, setCount] = useState(Number(initialCount) || 0);
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (busy) return;
    setBusy(true);
    const next = !isLiked;
    setIsLiked(next);
    setCount((c) => (next ? c + 1 : Math.max(0, c - 1)));
    try {
      await toggleFn(id);
    } catch (err) {
      setIsLiked(!next);
      setCount((c) => (!next ? c + 1 : Math.max(0, c - 1)));
      toast.error(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return { isLiked, count, busy, toggle };
}
