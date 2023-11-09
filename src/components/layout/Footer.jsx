import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col  gap-4 mt-5 py-8 bg-gray-100 justify-center items-center font-semibold w-full  ">
        <form className="flex gap-2">
          <input
            type="text"
            name="username"
            className="block text-xl bg-white flex-1 border-0 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
            placeholder="Send your response"
          />
          <button
            type="submit"
            className="uppercase hover:bg-[#2471A3]   bg-sky-900/100 rounded text-white px-3 py-2 font-semibold"
          >
            send
          </button>
        </form>
        <div className="uppercase font-medium text-2xl">
          all right reserved @sksuni.io
        </div>

        <div>
          <span className="flex gap-3">
            <Link className="text-gray-500 hover:text-sky-900/100" to={"#"}>
              <BsTwitter
                style={{
                  fontSize: "25px",
                  
                }}
              />
            </Link>

            <Link className="text-gray-500 hover:text-sky-900/100" to={"#"}>
              <FaFacebookF
                style={{
                  fontSize: "25px",
                 
                  
                }}
              />
            </Link>
            <Link className="text-gray-500 hover:text-sky-900/100" to={"#"}>
              <FaInstagramSquare
                style={{
                  fontSize: "25px",
                  
                }}
              />
            </Link>
            <Link className="text-gray-500 hover:text-sky-900/100" to={"#"}>
              <BsDiscord
                style={{
                  fontSize: "25px",
                 
                }}
              />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
