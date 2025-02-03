import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Authorization from "./components/authorization/Authorization.tsx";
import Registration from "./components/registration/Registration.tsx";
import Home from "./components/home/Home.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Authorization />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
