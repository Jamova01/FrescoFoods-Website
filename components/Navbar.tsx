"use client";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const pathname = usePathname();

  return (
    <nav className="flex justify-between relative w-full bg-slate-100 shadow-lg">
      <Link href="/">
        <div className="m-2">
          <span
            className="w-40 h-14 inline-block"
            style={{
              backgroundImage: 'url("/logo.svg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></span>
        </div>
      </Link>
      <div className="hidden md:flex md:items-center md:space-x-6">
        <ul className="uppercase text-center text-xl md:flex md:space-x-6">
          <Link href="/">
            <li
              className={`block p-3 hover:text-orange-600 font-medium text-base cursor-pointer ${
                pathname === "/" ? "text-red-500" : ""
              }`}
            >
              home
            </li>
          </Link>
          <Link href="#products-section">
            <li
              className={`block p-3 hover:text-orange-600 font-medium text-base cursor-pointer ${
                pathname === "/products" ? "text-red-500" : ""
              }`}
            >
              products
            </li>
          </Link>
          <Link href="#product-guide-section">
            <li
              className={`block p-3 hover:text-orange-600 font-medium text-base cursor-pointer`}
            >
              products guide
            </li>
          </Link>
          <Link href="#">
            <li
              className={`block p-3 hover:text-orange-600 font-medium text-base cursor-pointer`}
            >
              How to buy
            </li>
          </Link>
          <Link href="#contact-us-section">
            <li
              className={`block p-3 hover:text-orange-600 font-medium text-base cursor-pointer`}
            >
              contact us
            </li>
          </Link>
        </ul>
      </div>

      <div className="md:hidden absolute top-4 right-4">
        <button onClick={() => setToggle(!toggle)} className="">
          {toggle ? (
            <XMarkIcon className="w-8 h-w-8 text-black" />
          ) : (
            <Bars3Icon className="w-8 h-w-8 text-black" />
          )}
        </button>
      </div>
      {toggle && (
        <div className="absolute flex justify-end w-full top-20 md:hidden bg-black bg-opacity-40">
          <ul className="flex flex-col justify-center w-2/3 h-screen uppercase text-center text-xl bg-slate-200">
            <Link href="/">
              <li
                onClick={() => setToggle(!toggle)}
                className={`block p-3 hover:text-orange-600 font-medium text-base cursor-pointer ${
                  pathname === "/" ? "text-red-500" : ""
                }`}
              >
                home
              </li>
            </Link>
            <Link href="#products-section">
              <li
                onClick={() => setToggle(!toggle)}
                className={`block p-3 hover:text-orange-600 font-medium text-base cursor-pointer`}
              >
                products
              </li>
            </Link>
            <Link href="#product-guide-section">
              <li
                onClick={() => setToggle(!toggle)}
                className={`block p-3 hover:text-orange-600 font-medium text-base cursor-pointer`}
              >
                products guide
              </li>
            </Link>
            <Link href="#">
              <li
                onClick={() => setToggle(!toggle)}
                className={`block p-3 hover:text-orange-600 font-medium text-base cursor-pointer`}
              >
                How to buy
              </li>
            </Link>
            <Link href="#contact-us-section">
              <li
                onClick={() => setToggle(!toggle)}
                className={`block p-3 hover:text-orange-600 font-medium text-base cursor-pointer`}
              >
                contact us
              </li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};
