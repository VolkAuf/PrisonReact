import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Authorization from "./features/auth/Authorization.tsx";
import Registration from "./features/auth/Registration.tsx";
import Home from "./features/hub/Home.tsx";
import AuthProvider from "./features/auth/AuthProvider.tsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Authorization />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
