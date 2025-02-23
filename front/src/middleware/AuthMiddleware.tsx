import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../shared/hooks/useAuth.ts";
import Loader from "../components/loader/Loader.tsx";

interface AuthMiddlewareProps {
  authorizedRoutes: ReactNode;
  unauthorizedRoutes: ReactNode;
}

export default function AuthMiddleware(props: AuthMiddlewareProps) {
  const { isAuthenticated, setAxiosBearer, setUserSessionData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setAxiosBearer();
      setIsLoading(true);
      setUserSessionData()
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <>
      {isLoading
        ? createPortal(<Loader />, document.body)
        : isAuthenticated
          ? props.authorizedRoutes
          : props.unauthorizedRoutes}
    </>
  );
}
