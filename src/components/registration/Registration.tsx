import { FormEvent, useRef } from "react";
import "./Registration.css";
import crocoImage from "../../assets/croc.png";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      </div>
    </>
  );
}
