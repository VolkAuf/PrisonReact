import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//import bcrypt from "bcryptjs";
import "./Registration.css";
import crocoImage from "../../assets/croc.png";
import { User } from "../../entities/User.module.ts";
import Loader from "../loader/Loader.tsx";

export default function Registration() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // TODO: move to userApi.ts
  const checkIsUserExists = async (user: User) => {
    return fetch(
      "https://67a0bf435bcfff4fabe07668.mockapi.io/crocoApi/crocoUsers",
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const value = (data as User[]).find(
            (value) => value.email === user.email,
          );
          if (value) return true;
        }
        return false;
      });
  };

  const createUser = async (user: User) => {
    return fetch(
      "https://67a0bf435bcfff4fabe07668.mockapi.io/crocoApi/crocoUsers",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(user),
      },
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    setIsLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));
    /*if (localStorage.getItem(`user_${data["email"]}`)) {
      alert("Email address already exists!");
      return;
    }*/

    const user: User = {
      nickname: data["nickname"] as string,
      email: data["email"] as string,
      //password: bcrypt.hashSync(data["password"].toString()),
      password: data["password"] as string,
    };

    try {
      const isUserExists = await checkIsUserExists(user);
      if (isUserExists) throw new Error("User already exists!"); //TODO: make error handler
      await createUser(user);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepeatedPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity(
      passwordRef.current?.value !== e.currentTarget.value
        ? "Пароли не совпадают"
        : "",
    );
  };

  const handleSignIn = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={crocoImage}
            className="mx-auto h-25 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-300">
            🐊 Create your croc account 🐊
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-1"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm/6 font-medium text-gray-300 text-left"
              >
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
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-300 text-left"
              >
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
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-left text-gray-300"
              >
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
              <label
                htmlFor="repeatedPassword"
                className="block text-sm/6 font-medium text-left text-gray-300"
              >
                Repeat Password
              </label>
              <input
                id="repeatedPassword"
                name="repeatedPassword"
                type="password"
                required
                autoComplete="new-password"
                onChange={handleRepeatedPasswordChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <div className="flex-row space-y-2 mt-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-lime-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-lime-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={handleSignIn}
                className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        {isLoading && <Loader />}
      </div>
    </>
  );
}
