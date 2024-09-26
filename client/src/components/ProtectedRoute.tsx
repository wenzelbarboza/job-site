import { ReactNode } from "react";
import { useUserStore } from "../zustand/UserStore";
import { Navigate, useLocation } from "react-router-dom";

type props = { children: ReactNode };

export const ProtectedRoute = ({ children }: props) => {
  const { loading, user, accessToken } = useUserStore();
  const { pathname } = useLocation();

  if (!user || loading || !accessToken) {
    return <Navigate to={"/"} />;
  }

  if (user && !user.role && pathname !== "/onboarding") {
    return <Navigate to={"/onboarding"} />;
  }

  return children;
};
