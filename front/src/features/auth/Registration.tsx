import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../entities/User.ts";
import { useAuth } from "../../shared/hooks/useAuth.ts";
import { checkIfUserExists, createUser } from "./authApi.ts";
import Loader from "../../components/loader/Loader.tsx";
import ContentCard from "../../components/common/ContentCard.tsx";
import crocoImage from "../../assets/croc.png";

export default function Registration() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageActive, setIsPageActive] = useState(false);
  const { sessionData, login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    setIsLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const user: User = {
      nickname: data["nickname"] as string,
      email: data["email"] as string,
      password: data["password"] as string,
    };

    try {
      const isUserExists = await checkIfUserExists(user);
      if (isUserExists) throw new Error("User already exists!"); //TODO: make error handler
      await createUser(user);
      login(user);
      navigate("/home");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepeatedPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity(
      passwordRef.current?.value !== e.currentTarget.value ? "Passwords did not match" : "",
    );
  };

  const handleSignIn = () => {
    navigate("/signIn");
  };

  useEffect(() => {
    if (sessionData) navigate("/home");
    else if (sessionData === undefined) setIsPageActive(false);
    else setIsPageActive(true);
  }, [sessionData]);

  return (
    <>
      {isPageActive && (
        <ContentCard>
          <img alt="Croco Image" src={crocoImage} className="mx-auto h-25 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-300">
            🐊 Sign in to your croco account 🐊
          </h2>
          <div className="mt-10">
            <form action="#" method="POST" className="space-y-1" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nickname" className="block text-sm/6 font-medium text-gray-300 text-left">
                  Nickname
                </label>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-300 text-left">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-left text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  ref={passwordRef}
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <div>
                <label htmlFor="repeatedPassword" className="block text-sm/6 font-medium text-left text-gray-300">
                  Repeat Password
                </label>
                <input
                  id="repeatedPassword"
                  name="repeatedPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  onChange={handleRepeatedPasswordChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
                />
              </div>
              <div className="flex-row space-y-2 mt-5">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-lime-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-lime-600"
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </ContentCard>
      )}

      {isLoading && <Loader />}
    </>
  );
}
