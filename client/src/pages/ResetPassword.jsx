import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function ResetPassword() {
  const { userId, resetToken } = useParams();
  const { resetPassword, checkResetToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const response = await checkResetToken(userId, resetToken);
      if (response.status !== 200) {
        alert(response?.data?.message || "Invalid reset token.");
        navigate("/forgot-password");
      }
    };
    // checkToken();
  }, [userId, resetToken, checkResetToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert("Please enter both password fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    const response = await resetPassword(userId, resetToken, password);
    setLoading(false);
    if (response.status === 200) {
      setSuccess(true);
    } else {
      alert("Failed to reset password. Please try resending the reset link.");
      navigate("/forgot-password");
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
              Reset Password
            </h1>
            {success ? (
              <div className="flex flex-col">
                <p className="text-green-500">Password reset successfully.</p>
                <Link
                  className="bg-blue-500 py-2 text-sm font-thin text-white text-center rounded-md hover:bg-blue-600"
                  to="/signin"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-white md:text-base lg:text-xl"
                  >
                    New Password
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
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-white md:text-base lg:text-xl"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••••"
                    className="block w-full rounded-lg bg-neutral-800 p-2.5 text-sm text-white placeholder-gray-400 md:text-base"
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
                      <span>Resetting password...</span>
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
