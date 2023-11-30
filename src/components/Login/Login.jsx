import React, { useRef, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../Axios/Axios";
import axios from "axios";
import ForegotPassword from '../forgotpassword/Forgotpassword'
import { useDispatch } from "react-redux";
import {SetToken,SetUserName} from '../../Redux/client'
import { FormValidation } from "./validation";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import { toast } from "react-toastify";
function Login() {
  const notfy = () => {
    toast.success("Successflly Loggedin !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [loding, setLoding] = useState(false);
  const UsernameRef = useRef(null);
  const PasswordRef = useRef(null);
  const [Err, setErr] = useState({
    username: true,
    password: true,
  });
  const [eye, setEye] = useState("password");
  const [forgotepassword,setforgotpassword]=useState(false)

  async function Submit(e){
    try{

   
    e.preventDefault()
  const validate=  FormValidation({username:UsernameRef.current.value,password:PasswordRef.current.value},[1,2])
  if(validate.valid){
    setLoding(true)
   const res=await instance.post('/auth/login/',{username:UsernameRef.current.value,password:PasswordRef.current.value})
      console.log(res);
      setLoding(false)
      notfy()
      dispatch(SetToken({Token:res.data.token}))
      dispatch(SetUserName({Username:res.data.username}))
      navigate('/')
  }else{
    console.log(validate.err);
    setErr(validate.err)
  }
}catch(err){
  console.log(err);
  setLoding(false)
   if(err?.response?.data?.errors=="invalid credentials"){
    setErr({password:'invalide password'})
   }else if(err?.response?.data?.errors==' username: invalid credentials') {
    setErr({username:'User not found'})
   }
}
  }
  return (
    <div className="flex flex-col  justify-center items-center min-h-screen bg-white w-full dark:bg-gray-900 dark:text-white  text-black ">
     
      {forgotepassword?<ForegotPassword/>:
      <form
        className="flex font-display flex-col w-80 md:w-96 border h-fit dark:bg-gray-800 dark:border-slate-600 border-slate-400 rounded"
        onSubmit={Submit}
      >
        <div className="flex justify-end"><ThemeChanger/></div>
        {/* Heading */}
        <div className="flex justify-center w-full text-cente pt-2">
          <h1 className="capitalize  text-center font-bold text-2xl pb-3 ">
            Login
          </h1>
        </div>
        {/* Name */}

        {/* Username */}
        <div className="felx flex-col px-5 ">
          <label className="pl-1 " htmlFor="name">
            Username
          </label>
          <input
          ref={UsernameRef}
          onChange={()=>{
            let data=FormValidation({username:UsernameRef.current.value},[1])
            setErr(data.err)
          }}
            type="text"
            className="h-11 border dark:bg-gray-700 border-slate-600 rounded-md pl-3 w-full "
            placeholder="Name"
          />
           <p className="h-3  text-sm pb-[2px] text-red-600 pl-2">
            {Err.username == true ? "" : Err.username}
          </p>
        </div>
        {/* password */}
        <div className="felx flex-col px-5  relative">
          <label htmlFor="name">Password</label>
          <input
           onChange={()=>{
            let data=FormValidation({username:UsernameRef.current.value,password:PasswordRef.current.value},[1,2])
            setErr(data.err)
          }}
          ref={PasswordRef}
            type={eye}
            className="h-11 border dark:bg-gray-700 border-slate-600 rounded-md pl-3 w-full "
            placeholder="Password"
          />
 <p className="h-3  text-sm pb-[2px] text-red-600 pl-2">
            {Err.password == true ? "" : Err.password}
          </p>
          {eye == "password" ? (
            <FaRegEyeSlash
              onClick={() => setEye("text")}
              className="absolute right-8 top-10"
            />
          ) : (
            <FaRegEye
              onClick={() => setEye("password")}
              className="absolute right-8 top-10"
            />
          )}
        </div>
        {/* Submit */}
        <div className="felx flex-col ">
            <p onClick={()=>setforgotpassword(true)} className="flex text-blue-600 text-sm font-medium justify-end pr-6 pt-1">forgote password?</p>
        </div>
        <div className="flex items-start px-5 ">
          <button className="w-full flex justify-center items-center bg-emerald-700/80 mb-5 mt-3 h-11 font-black  text-white rounded">
          {loding ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-black fill-yellow-50"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>}
      <div className="flex w-80 md:w-96 h-20 rounded-md justify-center dark:bg-gray-800 dark:border-slate-600 items-center mt-4 border border-slate-400 ">
        <p className="font-normal font-display">
          Do you have an account?
          <Link to={"/register"} className="text-blue-600 font-medium">
          
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
