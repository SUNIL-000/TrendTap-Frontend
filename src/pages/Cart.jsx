import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsShieldFillCheck } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import axios from "axios";

const Cart = () => {
  const [auth] = useAuth();
  const [delet,setdelete] =useState(false)
  const [cart, setCart] = useState([]);
  const navigate=useNavigate();
  const location=useLocation();
  const [totalPrice, setTotalPrice] = useState(0);
  const deliveryAmount = `${cart.length > 0 ? 40 : 0}`;

  const userId = auth?.user?.userId;
  console.log(cart[0]?.products?._id);
  const getCartData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/cart/get-cart/${userId}`
      );
      setCart(data?.cart);
    } catch (error) {
      // Handle errors here
    }
  };
  const deleteCart = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/cart/delete-cart/${id}`
      );
      setdelete(!delet)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartData();
  }, [userId,delet]);

  useEffect(() => {
    const finalPrice = cart.reduce((acc, item) => {
      const itemPrice = item.products.price; // Convert price to a number
      return acc + itemPrice;
    }, 0);
    setTotalPrice(finalPrice);
  }, [cart]);
  useEffect(()=>{
    const redirectTimeout = setTimeout(() => {
      if (!auth?.token) {
        navigate("/signin",{state:location.pathname}); // Redirect to the signin page
      }
    }, 3000); // 3000 milliseconds (3 seconds)

    return () => {
      clearTimeout(redirectTimeout); // Clear the timeout if the component unmounts
    };


  },[auth])

  const finalAmount = totalPrice + +deliveryAmount ;

  return (
    <Layout>
      <div className="uppercase text-xl my-1 text-center font-bold text-gray-700">
        my <span className="text-purple-600">Cart({cart?.length})</span>
      </div>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-12 md:w-[80vw] gap-4 my-5  mx-auto">
        <div className=" col-span-1 md:col-span-8 ">
          {cart.map((item) => (
            <Link
              key={item._id}
              to={`/single-product/${item?.products?.slug}`}
              className="flex w-full relative gap-4 bg-[#F8F9F9] rounded-md shadow-md hover:shadow-lg p-3 items-start my-3 "
            >
              <div className="w-[100px] h-[100px]">
                <img
                  className="h-[100%] w-[100%] rounded"
                  src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${item?.products?._id}`}
                  alt={item?.products?.name}
                />
              </div>
              <div className="">
                <h1 className="capitalize  font-semibold text-md hover:text-blue-500">
                  {item?.products?.name}
                </h1>
                <h5 className=" capitalize text-gray-400 my-1">
                  {" "}
                  Category:
                  <span className="uppercase text-gray-400">
                    {" "}
                    {item?.products?.catagory.name}
                  </span>
                </h5>
                <h3 className=" font-bold text-lg text-[#2E4053] ">
                  ₹{item?.products?.price}{" "}
                  <span className="line-through text-gray-500 font-medium text-sm ml-2">
                    ₹
                    {item?.products?.price +
                      (
                        item?.products?.price *
                        Math.floor(60 + Math.random() * 20)
                      ).toPrecision(2) /
                        100}
                  </span>
                </h3>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  deleteCart(item?.products?._id);
                }}
                className="absolute right-0 mr-3 text-2xl text-[#CB4335] hover:text-[#EC7063]"
              >
                <MdDelete />
              </button>
            </Link>
          ))}
        </div>
        {/* price details  */}
        <div className="col-span-1 md:col-span-4 sticky">
          <div className=" shadow-xl  uppercase  rounded bg-[#F4F6F6] p-5 my-2">
            <div className="text-[#4D5656] text-xl mb-2 font-semibold">
              PRICE DETAILS
            </div>
            <hr />
            <span className="flex justify-between text-[#566573] text-md my-2 font-semibold">
              <h1>Price ({cart.length})</h1>
              <h1 className="text-black">₹{totalPrice}</h1>
            </span>
            <span className="flex justify-between text-[#566573] text-md my-2 font-semibold">
              <h1>Delivery fee</h1>
              <h1 className="text-black">₹{deliveryAmount}</h1>
            </span>
            <hr />
            <span className="flex justify-between text-[#283747] my-2 font-bold">
              <h1>total price</h1>
              <h1 className="text-[#148F77]">₹{finalAmount}</h1>
            </span>
            <div className="bg-purple-600 hover:bg-purple-700  transition-all text-center cursor-pointer text-white font-semibold p-3 rounded text-md mt-2">
              place order
            </div>
          </div>

          <div className="p-6 text-[#626567] flex justify-center gap-1 items-center text-2xl">
            <h5>
              <BsShieldFillCheck />
            </h5>
            <h2 className="text-sm">
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
