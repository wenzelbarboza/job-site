import { ReactNode } from "react";
import { useUserStore } from "../zustand/UserStore";
import { Navigate } from "react-router-dom";

type props = { children: ReactNode };

export const ProtectedRoute = ({ children }: props) => {
  const { loading, user, accessToken } = useUserStore();

  if (!user || loading || !accessToken) {
    return <Navigate to={"/"} />;
  }

  return children;
};
