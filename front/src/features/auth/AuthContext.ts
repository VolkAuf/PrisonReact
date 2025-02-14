import { createContext } from "react";
import { AuthContextInterface } from "./AuthProvider.tsx";

export const AuthContext = createContext<AuthContextInterface | null>(null);
