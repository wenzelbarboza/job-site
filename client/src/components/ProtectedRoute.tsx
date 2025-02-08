import { ReactNode } from "react";
import { useUserStore } from "../zustand/UserStore";
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

type props = { children: ReactNode };

export const ProtectedRoute = ({ children }: props) => {
  const { loading, user, accessToken } = useUserStore();
  const { pathname } = useLocation();
  const { toast } = useToast();

  if (!user || loading || !accessToken) {
    toast({
      title: "Unauthorized",
      description: "Please login to access this page",
    });
    return <Navigate to={"/"} />;
  }

  if (user && !user.role && pathname !== "/onboarding") {
    return <Navigate to={"/onboarding"} />;
  }

  return children;
};
