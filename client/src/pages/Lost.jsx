import React from "react";
import { Link } from "react-router-dom";

const Lost = () => {
  const remember = localStorage.getItem("remember");
  if (!remember) localStorage.removeItem("user");
  const userData = remember
    ? localStorage.getItem("user")
    : sessionStorage.getItem("user");
  const redirect = userData
    ? { text: "Home", path: "/" }
    : { text: "Sign in", path: "/signin" };

  return (
    <section className="font-supercell bg-none text-white">
      <div className="mx-auto flex flex-col items-center justify-center px-3 py-28 md:h-screen lg:px-6 lg:py-0">
        <div className="backdrop-blur-xs w-full rounded-lg bg-neutral-700 bg-opacity-60 bg-clip-padding shadow backdrop-filter sm:max-w-md md:mt-0 xl:p-0">
          <div className="p-3 lg:p-6">
            <div className="flex flex-row justify-center">
              <img src="/checkmark.png" alt="" className="size-8" />
              <h1 className="pl-2 text-3xl text-sky-300">ToDo App</h1>
            </div>
            <h1 className="mt-2 text-sm text-center text-red-500 md:text-xl lg:text-2xl">
              404 - Page Not Found
            </h1>
            <p className="mt-2 text-lg">
              Ahh Adventurer! Looks like you're lost.
            </p>
            <p className="mb-4 text-lg">Let's get you back on track.</p>
            <div className="flex justify-center">
              <Link
                to={redirect.path}
                className="rounded-md bg-blue-500 px-4 py-2 hover:cursor-pointer hover:bg-blue-600"
              >
                {" "}
                Go back to {redirect.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lost;
