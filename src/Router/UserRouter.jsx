import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from '../components/Login/Login'
import Register from "../components/Register/Register";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import { useSelector } from "react-redux";

function UserRouter() {
  const {Token}=useSelector(state=>state.Client)
  return (
    <>
      <Routes>
        <Route path="/" element={Token?<Homepage />:<Navigate to={'/login'}/>} />
        <Route path="/login" element={Token?<Navigate to={'/'}/>:<Login/>} />
        <Route path="/register" element={Token?<Navigate to={'/'}/>:<Register/>} />
        <Route path="/forgote-password" element={<ResetPassword/>}/>
      </Routes>
    </>
  );
}

export default UserRouter;
