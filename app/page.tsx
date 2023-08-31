import Image from "next/image";

import banner from "../public/banner.jpg";
import product from "../public/product_1.jpg";
import logo_v3 from "../public/logo_v3.png";

import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export default async function Page() {
  return (
    <div>
      <section className="px-5 py-10">
        <div className="relative w-80 m-auto rounded-md overflow-hidden">
          <Image src={banner} alt="" objectFit="contain" />
        </div>

        <div className="my-4 text-center">
          <h3 className="font-semibold">Download our Monthly Flyer</h3>
          <a
            href="/path/to/your/flyer.pdf"
            download
            className="mt-2 inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" /> Download
          </a>
        </div>
      </section>
      <div
        className="w-full h-2"
        style={{
          backgroundImage: 'url("/separator.svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <section className="px-5 py-10">
        <h2 className="text-2xl text-center font-semibold capitalize">
          products
        </h2>
        <div className="flex justify-center mt-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-md border border-gray-300"
              // onChange={handleSearch}
            />
            <div className="flex items-center absolute inset-y-0 right-0 p-3 rounded-tr-md rounded-br-md bg-green-500">
              <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 py-10">
          {[1, 2, 3, 4, 5].map((item) => (
            <article className="relative w-64 m-auto shadow-md rounded-md overflow-hidden">
              <Image src={product} alt="" objectFit="contain" />
            </article>
          ))}
        </div>
      </section>
      <div
        className="w-full h-2"
        style={{
          backgroundImage: 'url("/separator.svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <section className="flex flex-col gap-8 px-5 py-10">
        <h2 className="text-2xl text-center font-semibold capitalize">
          products guide
        </h2>
        <article className="">
          <p className="text-center text-lg">
            Get access to our Product Guide 2023
          </p>
          <article className="flex justify-center items-center relative w-full">
            <Image
              src={logo_v3}
              alt=""
              width={80}
              height={80}
              objectFit="contain"
            />
            <a
              href="/path/to/your/flyer.pdf"
              download
              className="mt-2 inline-flex items-center h-9 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" /> Download
            </a>
          </article>
        </article>
      </section>
    </div>
  );
}
