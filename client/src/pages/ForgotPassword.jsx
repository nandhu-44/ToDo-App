import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { forgotPassword } = useContext(UserContext);

  const navigate = useNavigate();
  checkSignedIn() && navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const response = await forgotPassword(email);
    if (response.status === 200) {
      setSuccess(true);
      setLoading(false);
    } else {
      setLoading(false);
      alert("Something went wrong. Please try again later.");
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
              Forgot Password
            </h1>
            {success ? (
              <p className="text-green-500">
                A password reset link has been sent to your email address.
              </p>
            ) : (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="ld:text-xl mb-2 block text-sm font-medium text-white md:text-base"
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
                <button
                  type="submit"
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
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Remember your password?{" "}
                  <Link
                    to="/signin"
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const checkSignedIn = () => {
  const remember = localStorage.getItem("remember");
  if (!remember) localStorage.removeItem("user");
  const userData = remember
    ? localStorage.getItem("user")
    : sessionStorage.getItem("user");
  return userData ? true : false;
};

export default ForgotPassword;
