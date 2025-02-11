import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Authorization from "./features/auth/Authorization.tsx";
import Registration from "./features/auth/Registration.tsx";
import Home from "./features/hub/Home.tsx";
import AuthProvider from "./features/auth/AuthProvider.tsx";
import Header from "./components/header/Header.tsx";
import CreateLobby from "./features/hub/CreateLobby.tsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="max-sm:mt-14 mt-20">
          <Routes>
            <Route path="*" element={<Navigate to="/signIn" />} />
            <Route path="/signIn" element={<Authorization />} />
            <Route path="/signUp" element={<Registration />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createLobby" element={<CreateLobby />} />
          </Routes>
          <Header />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
