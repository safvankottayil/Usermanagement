import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./Router/UserRouter";
import ThemeProvider from "./components/ThemeChanger/ThemeProvider";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <ThemeProvider>
      <BrowserRouter>
      <Routes>
        
        <Route path="/*" element={<UserRouter/>} />
        
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default App;
