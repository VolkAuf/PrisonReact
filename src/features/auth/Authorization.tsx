import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import crocoImage from "../../assets/croc.png";
import { UserCredentials } from "../../entities/User.module.ts";
//import bcrypt from "bcryptjs";
import Loader from "../../components/loader/Loader.tsx";
import { useAuth } from "../../shared/hooks/useAuth.ts";
import { getUserByCredentials } from "./authApi.ts";

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

  const handleCreateAccount = () => {
    navigate("/registration");
  };

  return (
    <>
      {isPageActive && (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Your Company" src={crocoImage} className="mx-auto h-25 w-auto" />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-300">
              🐊 Sign in to your croco account 🐊
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  className="flex w-full justify-center rounded-md bg-lime-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-lime-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={handleCreateAccount}
                  className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {(isLoading || !isPageActive) && <Loader />}
    </>
  );
}
