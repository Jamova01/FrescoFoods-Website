"use client";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="flex relative w-full bg-slate-100 shadow-lg">
      <button onClick={() => setToggle(!toggle)} className="p-4 absolute">
        {toggle ? (
          <XMarkIcon className="w-7 h-7 text-black" />
        ) : (
          <Bars3Icon className="w-7 h-7 text-black" />
        )}
      </button>
      <div className="m-auto">
        <span
          className="w-40 h-14 inline-block"
          style={{
            backgroundImage: 'url("/logo.svg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></span>
      </div>

      {toggle && (
        <div className="flex flex-col justify-center items-center absolute w-full h-[50vh] top-16 transition bg-slate-100 shadow-lg">
          <ul className="uppercase text-center text-xl w-full">
            <li className="block p-3 hover:text-orange-600 font-normal shadow-sm">
              home
            </li>
            <li className="block p-3 hover:text-orange-600 font-normal shadow-sm">
              products
            </li>
            <li className="block p-3 hover:text-orange-600 font-normal shadow-sm">
              guide
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
