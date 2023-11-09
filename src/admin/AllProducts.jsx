import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const AllProducts = () => {
  const [product, setProduct] = useState([]);
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-product`
      );

      if (data?.success) {
        console.log(data.products);
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <>
      
        <div className="w-full mx-auto flex justify-center items-center gap-2 md:gap-4 flex-wrap">
          {product.map((data) => {
            return (
              <Link
                to={`/dashboard/admin/product/${data.slug}`}
                key={data._id}
                className="sm:max-w-sm my-5 col-span-1 flex flex-col bg-[#fffffff9]  w-64 rounded overflow-hidden shadow-xl"
              >
                <img
                  className="w-full h-[280px]"
                  src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${data._id}`}
                  alt={data.name}
                />
                <hr />
                <div className="px-2 py-2 ">
                  <div className="font-semibold capitalize text-lg text-gray-800 mb-2">
                    {data.name.substring(0,40)}...
                  </div>
                  <p className="text-black font-bold text-md ">
                    ₹{data.price}{" "}
                    <span className="line-through text-gray-500 text-sm ml-2">
                      ₹{data.price + (data.price * 75) / 100}
                    </span>
                  </p>
                </div>
               
              </Link>
            );
          })}
        </div>
    </>
  );
};

export default AllProducts;
