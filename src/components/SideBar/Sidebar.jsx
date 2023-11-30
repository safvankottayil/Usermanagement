import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { SetUserName, SetToken } from "../../Redux/client";
import { useDispatch } from "react-redux";
import Changepassword from "../ChangePassword/Changepassword";
import { toast } from "react-toastify";
function Sidebar({Show,SetShow}) {
  const notfy = () => {
    toast.success("Successflly Logout !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const dispatch = useDispatch();
  const [changepassword, SetChangePassword] = useState(false);
  const [show, setshow] = useState(false);
  return (
    <div className={`${Show?'w-full ':'w-0'} md:w-52 lg:72  flex relative`}>
      {changepassword ? <Changepassword show={SetChangePassword} /> : ""}
     {Show?<div className="flex w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50"></div>:''}
      <div className={`left-0 h-screen overflow-hidden ${Show?'w-72':'w-0'}  transition-all duration-400 md:w-52 lg:72 flex flex-col dark:bg-gray-800 dark:text-white bg-white fixed top-0 `}>
        <div className=" hidden md:flex  h-16  md:pt-2 pl-5 font-extrabold font-display  text-xl">
          <h1>UserManagement</h1>
        </div>
        <div className="flex flex-col  ">
          <div className="flex md:hidden flex-col justify-center pt-3 items-end pb-6 md:pb-0 "><IoClose onClick={()=>SetShow(!Show)} className="h-8 w-8"/></div>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? " dark:hover:bg-slate-600  hover:bg-slate-300  flex w-full h-12 px-3 items-center"
                : "hover:bg-slate-300 flex dark:hover:bg-slate-600  w-full h-12 px-3 items-center"
            }
          >
            <CiHome className="w-7 h-7 " /> <p className="pl-3">Dashbord</p>{" "}
          </NavLink>
          <NavLink
            onClick={() =>{SetShow(false),SetChangePassword(!changepassword)}}
            className={({ isActive }) =>
              isActive
                ? " dark:hover:bg-slate-600  hover:bg-slate-300 flex w-full h-12 px-3 items-center"
                : "hover:bg-slate-300 flex dark:hover:bg-slate-600 w-full h-12 px-3 items-center"
            }
          >
            <IoKeyOutline className="w-7 h-7 " />{" "}
            <p className="pl-3">Change password</p>{" "}
          </NavLink>
          <NavLink
            onClick={() => {
                notfy();
                dispatch(
                SetToken({ Token: null }),
                SetUserName({ Username: null })
              );
            }}
            className={({ isActive }) =>
              isActive
                ? "border-r-4  border-emerald-500 hover:bg-slate-300 flex w-full dark:hover:bg-slate-600 h-12 px-3 items-center"
                : "dark:hover:bg-slate-600 hover:bg-slate-300 flex  w-full h-12 px-3 items-center"
            }
          >
            <CgLogOut className="w-7 h-7 " /> <p className="pl-3">Logout</p>{" "}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
