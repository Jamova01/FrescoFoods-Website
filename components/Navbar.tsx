"use client";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="flex relative h-14 w-full">
      <button onClick={() => setToggle(!toggle)} className="p-4 absolute">
        {toggle ? (
          <XMarkIcon className="h-6 w-6 text-black" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-black" />
        )}
      </button>
      <div className="m-auto">
        <h1 className="text-2xl font-semibold">Logo</h1>
      </div>

      {toggle && (
        <div className="flex flex-col justify-center items-center absolute w-full h-[50vh] top-14 transition bg-slate-400 shadow-lg">
          <ul className="uppercase text-center text-xl w-full">
            <li className="block p-3">home</li>
            <li className="block p-3">products</li>
            <li className="block p-3">guide</li>
          </ul>
        </div>
      )}
    </nav>
  );
};
