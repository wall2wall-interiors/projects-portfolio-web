import { useConvexAuth } from "convex/react";
import { useAuthService } from "../api/auth-service";

export const useAuth = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { logout } = useAuthService();

  return {
    isAuthenticated,
    isLoading,
    logout,
  };
};
