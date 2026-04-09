import { useAuthActions } from "@convex-dev/auth/react";

export const useAuthService = () => {
  const { signIn, signOut } = useAuthActions();

  const loginWithPassword = async (email: string, password: string) => {
    return await signIn("password", { email, password, flow: "signIn" });
  };

  const signUpWithPassword = async (email: string, password: string) => {
    return await signIn("password", { email, password, flow: "signUp" });
  };

  const logout = async () => {
    return await signOut();
  };

  return {
    loginWithPassword,
    signUpWithPassword,
    logout,
  };
};
