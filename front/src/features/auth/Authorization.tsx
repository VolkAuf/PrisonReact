import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { loginRequest } from "./userSessionApi.ts";
import { useAuth } from "../../shared/hooks/useAuth.ts";
import { UserCredentials } from "../../entities/user.ts";
import Loader from "../../components/loader/Loader.tsx";
import ContentCard from "../../components/common/ContentCard.tsx";
import crocoImage from "../../assets/croc.png";

export default function Authorization() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const userCredentials: UserCredentials = {
      email: data["email"] as string,
      password: data["password"] as string,
    };

    try {
      const userRes = await loginRequest(userCredentials);
      if (userRes.user && userRes.token) {
        login(userRes.user, userRes.token);
      } else {
        console.error(userRes.message);
        alert(userRes.message);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithoutAuth = () => {
    alert("Not supported yet");
  };

  const handleCreateAccount = () => {
    navigate("/signUp");
  };

  return (
    <>
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

          <div className="flex items-center w-auto mx-auto my-2">
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

      {isLoading && createPortal(<Loader />, document.body)}
    </>
  );
}
