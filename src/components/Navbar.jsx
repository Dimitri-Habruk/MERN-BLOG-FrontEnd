import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth,logout } from "../redux/features/auth/authSlice";

export const Navbar = () => {

  const isAuth = useSelector(checkIsAuth)

  const activeStyles = {
    color: "white",
    textDecoration: 'underline'

  };

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-sx text-white rounded-sm">
        E
      </span>

      {isAuth && (

      <ul className="flex gap-8">
        <li>
          <NavLink
            to={"/"}
            className="text-xs text-gray-400 hover:text-white"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/posts"}
            className="text-xs text-gray-400 hover:text-white"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            My posts
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/new"}
            className="text-xs text-gray-400 hover:text-white"
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Add post
          </NavLink>
        </li>
      </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? 
        (<button>Logout</button>): 
        (<Link to={'/login'}> Login</Link>)
        }
      </div>
    </div>
  );
};
