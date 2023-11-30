import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function ThemeProvider({children}) {
    const { Theme } = useSelector((state) => state.Client);
    useEffect(() => {
      if (Theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [Theme]);
  return (
   <>
   {children}</>
  )
}

export default ThemeProvider
