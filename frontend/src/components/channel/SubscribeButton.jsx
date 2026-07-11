import { useState } from "react";
import toast from "react-hot-toast";
import { Bell, BellRing } from "lucide-react";
import { toggleSubscription } from "../../api/subscriptionApi";
import { getErrorMessage } from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import Spinner from "../common/Spinner";

export default function SubscribeButton({
  channelId,
  isSubscribed: initialIsSubscribed = false,
  onChange,
  className,
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setIsLoading(true);
    const next = !isSubscribed;
    setIsSubscribed(next); // optimistic
    try {
      const { data } = await toggleSubscription(channelId);
      const subscribed = data.data.subscribed;
      setIsSubscribed(subscribed);
      onChange?.(subscribed);
      toast.success(subscribed ? "Subscribed" : "Unsubscribed");
    } catch (err) {
      setIsSubscribed(!next);
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        isSubscribed ? "btn-secondary" : "btn-primary",
        "shrink-0",
        className
      )}
    >
      {isLoading ? (
        <Spinner size={14} />
      ) : isSubscribed ? (
        <BellRing size={15} />
      ) : (
        <Bell size={15} />
      )}
      {isSubscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
}
