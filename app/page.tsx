"use client";
import Image from "next/image";

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import flyer from "../public/flyer.png";
import product_guide from "../public/product_guide.png";
import products from "../public/products.png";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const images = [
  "https://res.cloudinary.com/dppyvfxef/image/upload/v1701919851/Fresco_Foods/banners/autumn-banners/image_1.png",
  "https://res.cloudinary.com/dppyvfxef/image/upload/v1701919849/Fresco_Foods/banners/autumn-banners/image_2.png",
  "https://res.cloudinary.com/dppyvfxef/image/upload/v1701919853/Fresco_Foods/banners/autumn-banners/image_3.png",
  "https://res.cloudinary.com/dppyvfxef/image/upload/v1701919854/Fresco_Foods/banners/autumn-banners/image_4.png",
  "https://res.cloudinary.com/dppyvfxef/image/upload/v1701919854/Fresco_Foods/banners/autumn-banners/image_5.png",
  "https://res.cloudinary.com/dppyvfxef/image/upload/v1694815709/Fresco_Foods/banners/image_3.png",
  "https://res.cloudinary.com/dppyvfxef/image/upload/v1694815662/Fresco_Foods/banners/image_2.png",
];

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <section id="banner-section" className="flex flex-col gap-4 px-5 py-10">
        <div className="w-full max-w-5xl mx-auto items-center xl:w-2/3">
          <div className="overflow-hidden lg:rounded-main-lg rounded-lg">
            <Swiper
              slidesPerView={1}
              speed={400}
              modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              navigation={false}
              loop={true}
              spaceBetween={50}
              pagination={{ dynamicBullets: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {images?.length > 0 &&
                images.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img src={image} alt="" width={1000} className="m-auto" />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>

        <div className="flex flex-col gap-3 my-4 text-center">
          <h3 className="text-xl font-semibold">Download our Monthly Flyer</h3>
          <div className="flex flex-col items-center gap-6">
            <div className="w-2/3 md:w-1/3 relative">
              <Image
                src={flyer}
                alt=""
                objectFit="cover"
                layout="responsive"
                width={800}
                height={400}
              />
            </div>
            <a
              href="/Flyer_January_2024_Online.pdf"
              download
              className="inline-flex items-center px-6 py-3 bg-[#A8D42E] text-white font-semibold rounded-md capitalize hover:bg-green-600 transition duration-300"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" /> Download
            </a>
          </div>
        </div>
      </section>
      <section id="products-section" className="flex flex-col gap-4 py-5">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="w-full md:w-1/2 relative">
            <Image
              src={products}
              alt="Products"
              objectFit="cover"
              layout="responsive"
              width={800}
              height={400}
            />
          </div>
          <div className="flex flex-col items-center md:items-start md:ml-4">
            <h2 className="text-2xl text-center font-semibold capitalize">
              See all products
            </h2>
            <p className="text-lg mb-4 text-center md:text-left">
              Discover our wide range of high-quality products.
            </p>

            <button
              onClick={() => router.push("/products")}
              className="mt-2 inline-flex items-center px-6 py-3 bg-[#A8D42E] text-white font-semibold rounded-md capitalize hover:bg-green-600 transition duration-300"
            >
              View all products
            </button>
          </div>
        </div>
      </section>
      <section
        id="product-guide-section"
        className="flex flex-col gap-2 px-5 py-10"
      >
        <h2 className="text-2xl text-center font-semibold capitalize">
          products guide
        </h2>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <p className="text-center text-lg p-4">
              Get access to our 2023 Product Guide.
            </p>
            <div className="w-full md:w-2/3 relative">
              <Image
                src={product_guide}
                alt="Product Guide"
                objectFit="cover"
                layout="responsive"
                width={800}
                height={400}
              />
            </div>
            <a
              href="/Special Flyer  2023_Fresco Foods_compressed.pdf"
              download
              className="inline-flex items-center px-6 py-3 bg-[#A8D42E] text-white font-semibold rounded-md capitalize hover:bg-green-600 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Download Guide
            </a>
          </div>
        </div>
      </section>
      <section id="contact-us-section" className="bg-white py-10">
        <div className="max-w-5xl mx-auto p-5">
          <h2 className="text-2xl font-semibold text-center mb-5">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              id="account-manager"
              className="bg-gray-100 rounded-lg shadow-md p-4"
            >
              <h3 className="text-lg font-semibold">Account Manager</h3>
              <p>Diana Castillo</p>
              <p>Mobile: 612-214-4561</p>
              <p>
                Email:{" "}
                <a href="mailto:contact@frescofoodsmn.com">
                  Diana@frescofoodsmn.com
                </a>
              </p>
            </div>
            <div
              id="managing-director"
              className="bg-gray-100 rounded-lg shadow-md p-4"
            >
              <h3 className="text-lg font-semibold">Managing Director</h3>
              <p>Alan Rojas</p>
              <p>Mobile: 952-245-0506</p>
              <p>
                Email:{" "}
                <a href="mailto:contact@frescofoodsmn.com">
                  Alan@frescofoodsmn.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
