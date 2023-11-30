import React, { useEffect, useRef, useState } from "react";
import { instance } from "../Axios/Axios";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetToken, SetUserName } from "../Redux/client";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/SideBar/Sidebar";
function Homepage() {
  const { Token } = useSelector((state) => state.Client);
  console.log(typeof Token);
  const [Show,setshow]=useState(false)
  const [Search, setSerach] = useState("");
  const [Users, SetUsers] = useState([]);
  const [pagination, setpagination] = useState({ prev: false, next: true });
  const [changePage, SetchangePage] = useState(1);
  const dispach = useDispatch();
  useEffect(() => {
    instance
      .get("/users/?page=" + changePage)
      .then((res) => {
        console.log(res.data);

        if (res.statusText == "OK") {
          SetUsers(res.data.results);
          if (res.data.next == null) {
            setpagination({ prev: pagination.prev, next: false });
          } else {
            setpagination({ prev: pagination.prev, next: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changePage]);
  return (
    <div className="flex flex-col w-full min-h-screen dark:bg-gray-900 dark:text-white bg-white">
      <Navbar Show={Show} SetShow={setshow}  setSerach={setSerach} />
      <div className="flex flex-grow">
        <Sidebar Show={Show} SetShow={setshow} />
        <div className="flex flex-col flex-grow w-full md:pl-16 md:pr-4 pr-3 pl-3  dark:bg-gray-900 bg-slate-100   ">
          <div className="flex h-16 items-center">
            <h1 className="text-2xl font-semibold ">Dashbord</h1>
          </div>
          <div className="w-full ring-2 dark:ring-slate-600  ring-black ring-opacity-10 overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="  md:text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">No</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">UserName</th>
                    <th className="px-4 py-3">Stats</th>
                  </tr>
                </thead>
                <tbody>
                  {Users.map((value) => {
                    if (Search.length > 0) {
                      const char = value.name.slice(0, Search.length);
                      if (char == Search) {
                        return (
                          <tr className="bg-white text-[10px] md:text-xs divide-y dark:text-slate-100 dark:divide-gray-700 dark:bg-gray-800">
                            <td className="px-4 text-[10px] md:text-xs py-3">{value.id}</td>
                            <td className="px-4 text-[10px] md:text-xs py-3">{value.name}</td>
                            <td className="px-4 text-[10px] md:text-xs py-3">{value.username}</td>
                            <td className="px-4 text-[10px] md:text-xs py-3 ">
                              {" "}
                              <span className="rounded-md font-bold text-pb-1 px-2 py-1 bg-emerald-400">
                                active
                              </span>
                            </td>
                          </tr>
                        );
                      }
                    } else {
                      return (
                        <tr className="bg-white divide-y dark:text-slate-100 dark:divide-gray-700 dark:bg-gray-800">
                          <td className="px-4 py-3">{value.id}</td>
                          <td className="px-4 py-3">{value.name}</td>
                          <td className="px-4 py-3">{value.username}</td>
                          <td className="px-4 py-3 ">
                            <span className="rounded-md font-bold text-pb-1 px-2 py-1 bg-emerald-400">
                              active
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className="h-12 flex justify-center dark:bg-gray-800 border-t dark:border-slate-500">
              <div className="flex uppercase ring-1 m-2 rounded-sm ring-slate-400">
                {changePage > 1 ? (
                  <p
                    onClick={() => SetchangePage(changePage - 1)}
                    className="px-2 py-1"
                  >
                    prev
                  </p>
                ) : (
                  ""
                )}
                <p className="px-2 font-bold border-l-2 border-r-2 border-slate-400 py-1">
                  {changePage}
                </p>
                {pagination.next ? (
                  <p
                    onClick={() => SetchangePage(changePage + 1)}
                    className="px-2  py-1"
                  >
                    next{" "}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
