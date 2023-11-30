import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetTheme } from "../../Redux/client";
import {BsCloudSun} from 'react-icons/bs'
import {TbMoonFilled} from 'react-icons/tb'
function ThemeChanger() {
  const dispatch = useDispatch();
  const { Theme } = useSelector((state) => state.Client);

  useEffect(() => {
    if (Theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [Theme]);
  const handleThemechange = () => {
    dispatch(SetTheme({ Theme: Theme === "dark" ? "light" : "dark" }));
  };
  return (
    <button
      className=" w-12 h-12 flex items-center justify-center rounded-md"
      onClick={handleThemechange}
    >
      {Theme == "dark" ? (
        <BsCloudSun className="w-6 h-7" />
      ) : (
        <TbMoonFilled className="w-6 h-7" />
      )}
    </button>
  );
}

export default ThemeChanger;
