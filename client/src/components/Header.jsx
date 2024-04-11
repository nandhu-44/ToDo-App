import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // Handling logout
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };
  return (
    <nav className="flex justify-between p-2 lg:p-4">
      <Link to="/" className="flex flex-row">
        <img
          src="/checkmark.png"
          alt="icon"
          className="h-6 w-6 rounded-full lg:h-8 lg:w-8"
        />
        <h1 className="font-supercell text-pretty px-2 text-base text-sky-300 lg:text-2xl">
          ToDo App
        </h1>
      </Link>
      <div className="flex flex-row">
        <h3 className="font-supercell  px-2 py-1 text-[0.875rem] text-white hover:cursor-pointer lg:px-4 lg:py-2 lg:text-xl">
          Welcome {user?.name}
        </h3>
        <button
          className="font-supercell rounded-lg bg-blue-500 px-4 py-0.5 text-[0.875rem] text-white hover:bg-blue-600 lg:py-2 lg:text-xl"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
