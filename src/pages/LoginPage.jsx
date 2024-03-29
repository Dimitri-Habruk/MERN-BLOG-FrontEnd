import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser,checkIsAuth } from "../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()
  const { status } = useSelector((state) => state.auth);


  const handleSubmit =()=>{
    try {
      dispatch(loginUser({username, password}))
    
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(status) toast(status)
    if(isAuth) navigate('/')
  },[status, navigate, isAuth]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">Sign in to MERN Blog</h1>

      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="Username"
          placeholder="Username"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="Password"
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <div>
        <p className="text-center text-gray-400 text-xs">forgot password ?</p>
      </div>

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={()=>handleSubmit()}

          className="flex bg-gray-600 justify-center items-center text-xs text-white rounded-sm py-2 px-4"
        >
          Login
        </button>

        <Link
          to="/register"
          className="flex justify-center items-center text-xs text-white"
        >
          Don't have an account?
        </Link>
      </div>
    </form>
  );
};
