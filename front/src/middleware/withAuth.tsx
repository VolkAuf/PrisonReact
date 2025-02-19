import AuthMiddleware from "./AuthMiddleware.tsx";
import { ReactNode } from "react";

const withAuth = (authorizedRoutes: ReactNode, unauthorizedRoutes: ReactNode) => {
  return <AuthMiddleware authorizedRoutes={authorizedRoutes} unauthorizedRoutes={unauthorizedRoutes} />;
};

export default withAuth;
