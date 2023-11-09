import React from "react";
import { Link } from "react-router-dom";

const BannerPage = () => {
  return (
    <div
      className=" bg-blue-500 flex sm:flex-row flex-col-reverse justify-center items-center relative inset-0 "
      style={{
        backgroundImage:
          "linear-gradient(32deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
      }}
    >
      <div className="flex flex-col  md:w-1/2 justify-center items-center ">
        <h1 className="uppercase text-white font-bold text-8xl">sales</h1>
        <p className="text-justify text-gray-300 text-lg p-5  md:w-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nisi
          asperiores cupiditate tempora, saepe quaerat molestias, enim
          exercitationem facere dolor optio mollitia modi ipsum sapiente
          consectetur, odio a quibusdam quidem.
        </p>
        <div className="flex gap-3 my-3">
          <button className="uppercase  border-2 p-2 rounded-md text-gray-300 font-semibold m hover:bg-gray-100 hover:text-black transition-opacity ">
            read more
          </button>
          <Link to={"/product"} className="uppercase  border-2 p-2 rounded-md font-semibold  bg-gray-200 text-black hover:bg-transparent hover:text-white transition">
            explore more
          </Link >
        </div>
      </div>
      <div className=" w-1/2">
        <img src={"images/banner.png"} className="" alt="banner" />
      </div>
    </div>
  );
};

export default BannerPage;
