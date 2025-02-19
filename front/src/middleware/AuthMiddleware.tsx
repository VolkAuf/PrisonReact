import { ReactNode } from "react";
import { useAuth } from "../shared/hooks/useAuth.ts";

interface AuthMiddlewareProps {
  authorizedRoutes: ReactNode;
  unauthorizedRoutes: ReactNode;
}

export default function AuthMiddleware(props: AuthMiddlewareProps) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? props.authorizedRoutes : props.unauthorizedRoutes;
}
