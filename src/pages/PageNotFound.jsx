import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-2xl text-center uppercase font-bold">sorry!!! <br />page not found</h1>
        <Link to={"/"}><BsFillArrowLeftCircleFill  style={{fontSize:"40px"}}/></Link>
        <img src="/images/error.svg" className="" alt="errror" />
      </div>
    </>
  );
};

export default PageNotFound;
