import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { useMemo } from "react";
import withAuth from "./middleware/withAuth.tsx";
import { store } from "./store/store.ts";
import Authorization from "./features/auth/Authorization.tsx";
import Registration from "./features/auth/Registration.tsx";
import Home from "./features/hub/Home.tsx";
import Header from "./components/header/Header.tsx";
import CreateLobby from "./features/hub/CreateLobby.tsx";

export default function App() {
  const authorizedRoutes = (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createLobby" element={<CreateLobby />} />
      </Routes>
      <Header />
    </>
  );

  const unauthorizedRoutes = (
    <Routes>
      <Route path="*" element={<Navigate to="/signIn" />} />
      <Route path="/signIn" element={<Authorization />} />
      <Route path="/signUp" element={<Registration />} />
    </Routes>
  );

  const routes = useMemo(() => withAuth(authorizedRoutes, unauthorizedRoutes), []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="max-sm:mt-14 mt-20">{routes}</div>
      </BrowserRouter>
    </Provider>
  );
}
