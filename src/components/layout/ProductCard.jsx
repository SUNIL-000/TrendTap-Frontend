import React from "react";
import { Link } from "react-router-dom";
import { IoHeartOutline } from 'react-icons/io5';
const ProductCard = ({ product }) => {
  return (
    <>
      {product.map((data, index) => {
        return (
          <Link
            key={index}
            to={`/single-product/${data.slug}`}
            className="sm:max-w-sm my-5 col-span-1 flex flex-col bg-[#fffffff9]  w-64 rounded overflow-hidden shadow-md hover:shadow-xl"
          >
           
            <div className="relative p-1">
              <img
                className="w-full h-[280px] rounded "
                src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${data._id}`}
                alt={data.name}
              />
              {/* <h1 className="absolute  top-1 text-2xl text-black drop-shadow-2xl right-0 mr-2"><IoHeartOutline /></h1> */}
            </div>
            
            <div className="px-2 py-2 relative">
              
              <div className="font-medium hover:text-[#2E86C1] capitalize text-md text-gray-800 mb-2">
                {data.name.substring(0, 40)}...
              </div>
              <p className="text-black font-bold text-md ">
                ₹{data.price}{" "}
                <span className="line-through text-gray-500 text-sm ml-2">
                  ₹
                  {data.price +
                    (
                      data.price * Math.floor(60 + Math.random() * 20)
                    ).toPrecision(2) /
                      100}
                </span>
                <span className="text-green-500 mx-1 text-sm">
                  {Math.floor(60 + Math.random() * 20)}% Off
                </span>
              </p>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default ProductCard;
