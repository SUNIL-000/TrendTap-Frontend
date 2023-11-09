import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";
import { useAuth } from "../context/authContext";
// import { useCart } from "../context/cartContext"h
// import Wishlist from "./Wishlist";
const SingleProducts = () => {
  const [auth] = useAuth();
  const { slug } = useParams();
  const [sproduct, setSproduct] = useState([]);
  const userId = auth?.user?.userId;
  const products = sproduct._id;

  const fetchSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/get-product/${slug}`
      );

      if (data.success) {
        setSproduct(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleWishlist = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/wishlist/create-wishlist`,
        { userId, products }
      );
      console.log(data);
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  //wish section
  const handleCart = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/cart/create-cart`,
        { userId, products }
      );
      console.log(data);
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleProduct();
  }, []);

  return (
    <Layout>
      <div className="flex w-full  py-3  gap-3 flex-wrap justify-center items-start ">
        <div className="h-[70vh]">
          <img
            src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${sproduct._id}`}
            className="w-[100%] h-[100%] rounded "
            alt={"n"}
          />
        </div>
        <div className="col-span-5 p-5 rounded-lg   ">
          <div className="my-2">
            <h1 className="text-[#2E4053] text-xl font-medium">
              {sproduct.name}
            </h1>
          </div>
          <hr />
          <div className="w-[300px]  md:w-[480px] my-2">
            <p className="text-justify text-[#909497] text-md font-medium">
              {sproduct.description}
            </p>
          </div>

          <h1 className="text-2xl my-1 font-bold">
            ₹{sproduct.price}{" "}
            <span className="text-sm text-gray-400 mx-1 line-through font-semibold">
              ₹
              {sproduct.price +
                (sproduct.price *
                  Math.floor(60 + Math.random() * 20).toPrecision(2)) /
                  100}
            </span>
            <span className="mx-2 text-sm text-[#28B463]">
              ({Math.floor(60 + Math.random() * 20)}% OFF)
            </span>
          </h1>
          <h4 className="my-1 font-semibold text-[#1ABC9C]">
            Inclusive of all taxes
          </h4>

          <div className="flex  gap-2">
            <button
              onClick={handleCart}
              type="button"
              className="bg-[#212F3C] hover:bg-[#17202A] rounded-sm hover:shadow-md  gap-1 p-3 flex justify-center items-center font-bold uppercase  text-white"
            >
              <span>
                <BsCartFill />
              </span>
              add to cart
            </button>
            <button
              onClick={handleWishlist}
              type="button"
              className="bg-[#D35400] hover:bg-[#BA4A00] rounded-sm hover:shadow-md gap-1 p-3  flex justify-center items-center font-bold uppercase text-white"
            >
              <span>
                <AiTwotoneHeart />
              </span>
              wishlist
            </button>
          </div>
          <div className="my-2 gap-2 text-[#424949] ">
            <h4>100% Original Products </h4>
            <h4> Pay on delivery might be available</h4>
            <h4>Easy 14 days returns and exchanges</h4>
            <h4>Try & Buy might be available</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProducts;
