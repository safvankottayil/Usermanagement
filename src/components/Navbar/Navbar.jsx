import React, { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SetUserName,SetToken } from "../../Redux/client";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import { RiMenu2Fill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
function Navbar({setSerach,Show,SetShow}) {
    const dispatch=useDispatch()
    const SearchRef=useRef(null)
  const { Token } = useSelector((state) => state.Client);
  const [showlogout, setShowlogout] = useState(false);
  return (
    <div className="flex h-16 w-full ">
      <div className="w-full fixed shadow  shadow-slate-300 dark:shadow-gray-950 h-16 dark:bg-gray-800 dark:text-white bg-white items-center flex justify-between">
      <div  className=" hidden md:flex font-extrabold font-display pl-5 text-2xl"><h1></h1></div>
      <div className="flex md:hidden pl-2"><RiMenu2Fill onClick={()=>SetShow(!Show)} className="h-7 w-7"/></div>
      <div className="flex relative">
          <input onChange={()=>setSerach(SearchRef.current.value)} ref={SearchRef} type="text" className="h-9 md:w-[550px] focus:outline-slate-400 bg-slate-100 ring-2 dark:ring-gray-600 ring-slate-400 rounded-md pl-8 dark:bg-gray-900"placeholder="Search"  />
          <IoSearchOutline className="absolute left-[6px] top-2 w-5 h-5"/>
        </div>
      <div className="flex items-center  ">
        {/* <div></div> */}
        
      <div className="md:mx-4"><ThemeChanger/></div>
        <div className=" md:pr-10 pr-3 relative ">
          <FaUserCircle
            onClick={() => setShowlogout(!showlogout)}
            className="w-7 h-7 "
          />
          <div
            className={` ${
              showlogout ? "min-w-min w-40 transition-all duration-150 h-fit" : "h-0 w-0"
            } overflow-hidden transition-all duration-100 absolute ring-black ring-opacity-5 rounded-md ring-5 shadow-sm shadow-slate-600  top-11 right-16 bg-slate-200  border-double border `}
          >
            <div className="flex flex-col">
                {Token?'':<Link to={'/login'} className="flex pl-3 pr-2 font-medium p-2 hover:bg-white">Login</Link>}
                {Token?<Link to={'/change-password'} className="flex pl-3 pr-2 font-medium p-2 whitespace-nowrap hover:bg-white">Change password</Link>:''}
                <Link className="flex pl-3 pr-2 font-medium p-2 whitespace-nowrap hover:bg-white">Dark</Link>
                {Token?<Link onClick={()=>dispatch(SetToken({Token:null}),SetUserName({Username:null}))} className="flex pl-3 pr-2 font-medium p-2 hover:bg-white">Logout</Link>:''}
                
            </div>
          </div>
        </div>
      </div>
     

       
      </div>
    </div>
  );
}

export default Navbar;
