import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {registerUser, checkIsAuth} from '../redux/features/auth/authSlice.js'
import { toast } from 'react-toastify';


export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {status} =useSelector(state=>state.auth)
  const isAuth = useSelector(checkIsAuth)

  const handleSubmit =()=>{
    try {
      dispatch(registerUser({username, password}))
      setPassword('') //clean form
      setUsername('') //clean form
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(status){
      toast(status)
    }
    if(isAuth) navigate('/')
  },[status, isAuth, navigate])

  return (
    <form
    onSubmit={(e) => e.preventDefault()}
    className="w-1/4 h-60 mx-auto mt-40"
  >
    <h1 className="text-lg text-white text-center">New on MERN Blog</h1>
    <label className="text-xs text-gray-400">
      Username:
      <input
        type="text"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
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
        onChange={(e)=>setPassword(e.target.value)}
        name="Password"
        placeholder="Password"
        className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
      />
    </label>

    <div className="flex gap-8 justify-center mt-4">
      <button
        type="submit"
        onClick={()=>handleSubmit()}
        className="flex bg-gray-600 justify-center items-center text-xs text-white rounded-sm py-2 px-4"
      >
        Create account
      </button>

      <Link
        to="/login"
        className="flex justify-center items-center text-xs text-white"
      >
        Already have an account?
      </Link>
    </div>
  </form>  )
}
