import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function SignIn() {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  checkSignedIn() && navigate("/");

  const { login } = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    const response = await login(email, password, remember);
    if (response.status === 200) {
      navigate("/");
    } else {
      alert("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <section className="font-supercell bg-none">
      <div className="mx-auto flex flex-col items-center justify-center px-3 py-28 md:h-screen lg:px-6 lg:py-0">
        <div className="backdrop-blur-xs w-full rounded-lg bg-neutral-700 bg-opacity-60 bg-clip-padding shadow backdrop-filter sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-3 md:space-y-6 lg:p-6">
            <div className="flex flex-row justify-center">
              <img src="/checkmark.png" alt="" className="size-8" />
              <h1 className="pl-2 text-3xl text-sky-300">ToDo App</h1>
            </div>
            <h1 className="text-sm text-white md:text-xl lg:text-2xl">
              Welcome Back! Sign in to continue.
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="lg:text-xl mb-2 block text-sm font-medium text-white md:text-base"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  className="block w-full rounded-lg bg-neutral-800 p-2.5 text-sm text-white placeholder-gray-400 md:text-base"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="lg:text-xl mb-2 block text-sm font-medium text-white md:text-base"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••••"
                  className="block w-full rounded-lg bg-neutral-800 p-2.5 text-sm text-white placeholder-gray-400 md:text-base"
                  required={true}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    value={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="m-1 mr-2 rounded-sm p-1 outline-none checked:bg-blue-500"
                  />
                  <label htmlFor="remember" className="text-white">
                    Stay signed in
                  </label>
                </div>
                <div className="right-0 flex text-pretty">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex w-full items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="mr-2 animate-spin"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const checkSignedIn = () => {
  const remember = localStorage.getItem("remember");
  if(!remember) localStorage.removeItem("user");
  const userData = remember
    ? localStorage.getItem("user")
    : sessionStorage.getItem("user");
  return userData ? true : false;
};

export default SignIn;
