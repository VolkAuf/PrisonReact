import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import crocoImage from "../../assets/croc.png";
import { UserCredentials } from "../../entities/User.module.ts";
//import bcrypt from "bcryptjs";
import Loader from "../../components/loader/Loader.tsx";
import { useAuth } from "../../shared/hooks/useAuth.ts";
import { getUserByCredentials } from "./authApi.ts";
import ContentCard from "../../components/common/ContentCard.tsx";

export default function Authorization() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageActive, setIsPageActive] = useState(false);
  const { sessionData, login } = useAuth();

  useEffect(() => {
    if (sessionData) navigate("/home");
    else if (sessionData === undefined) setIsPageActive(false);
    else setIsPageActive(true);
  }, [sessionData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const userCredentials: UserCredentials = {
      email: data["email"] as string,
      password: data["password"] as string,
    };

    try {
      const user = await getUserByCredentials(userCredentials);
      if (user) {
        login(user);
        navigate("/home");
      } else alert("Invalid Credentials");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithoutAuth = () => {
    const rnd = Math.floor(Math.random() * 100);
    login({
      email: "",
      password: "",
      nickname: `ruzik${rnd}`,
    });
    navigate("/home");
  };

  const handleCreateAccount = () => {
    navigate("/registration");
  };

  return (
    <>
      {isPageActive && (
        <ContentCard>
          <img alt="Croco Image" src={crocoImage} className="mx-auto h-25 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-300">
            🐊Sign in to your croco account🐊
          </h2>
          <div className="mt-5">
            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-300 text-left">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-300">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-green-600 hover:text-green-700">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="flex-row space-y-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-lime-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-lime-600 "
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={handleCreateAccount}
                  className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-600"
                >
                  Create Account
                </button>
              </div>
            </form>
            <div className="flex items-center w-80 mx-auto my-2">
              <div className="flex-grow border-t border-gray-500"></div>
              <span className="px-4 text-gray-500">Or</span>
              <div className="flex-grow border-t border-gray-500"></div>
            </div>
            <button
              type="button"
              onClick={handleWithoutAuth}
              className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 "
            >
              Continue without Auth
            </button>
          </div>
        </ContentCard>
      )}

      {(isLoading || !isPageActive) && <Loader />}
    </>
  );
}
