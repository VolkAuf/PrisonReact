import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Authorization from "./components/authorization/Authorization.tsx";
import Registration from "./components/registration/Registration.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Authorization />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}
