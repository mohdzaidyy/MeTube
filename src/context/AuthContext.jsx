import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../api/userApi";
import { getErrorMessage } from "../api/axiosClient";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const { data } = await getCurrentUser();
      setUser(data.data);
      return data.data;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    (async () => {
      setIsBootstrapping(true);
      await fetchCurrentUser();
      setIsBootstrapping(false);
    })();
  }, [fetchCurrentUser]);

  const login = useCallback(
    async ({ identifier, password }) => {
      const isEmail = identifier.includes("@");
      const payload = isEmail
        ? { email: identifier, password }
        : { username: identifier, password };
      await loginUser(payload);
      const freshUser = await fetchCurrentUser();
      return freshUser;
    },
    [fetchCurrentUser]
  );

  const register = useCallback(async (formData) => {
    const { data } = await registerUser(formData);
    return data.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  }, []);

  const updateUserInPlace = useCallback((patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isBootstrapping,
    login,
    register,
    logout,
    refreshUser: fetchCurrentUser,
    updateUserInPlace,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export { getErrorMessage };
