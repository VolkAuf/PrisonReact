import { ReactNode, useEffect } from "react";
import { useAuth } from "../shared/hooks/useAuth.ts";

interface AuthMiddlewareProps {
  authorizedRoutes: ReactNode;
  unauthorizedRoutes: ReactNode;
}

export default function AuthMiddleware(props: AuthMiddlewareProps) {
  const { isAuthenticated, setAxiosBearer } = useAuth();
  console.log("sonsolelog");

  useEffect(() => {
    if (isAuthenticated) {
      setAxiosBearer();
    }
    console.log("effect sonsolelog");
  }, []);

  return isAuthenticated ? props.authorizedRoutes : props.unauthorizedRoutes;
}
