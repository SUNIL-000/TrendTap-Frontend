import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useWishlist } from "../context/wishlistContext";
import { useAuth } from "../context/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";
const Wishlist = () => {
  const [deletes, setDelete] = useState(false);
  const [wishlist, setWishlist] = useWishlist();
  const [auth] = useAuth();
  console.log(auth?.user);
  const userId = auth?.user?.userId;
  const navigate=useNavigate();
  const location=useLocation();

  const getWishlist = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/wishlist/get-wishlist/${userId}`
      );
      console.log(data);
      setWishlist(data?.wishlist);
    } catch (error) {}
  };
  const deleteCart = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/wishlist/delete-wishlist/${id}`
      );
      setDelete(!deletes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
    
  }, [userId, deletes]);
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
  return (
    <Layout className="">
      <div className=" block md:grid  grid-cols-10 items-start my-3 gap-4 mx-auto">
        <div className="col-span-3  flex justify-center items-center gap-1 bg-white">
          <div className="h-15 w-15 p-2 ">
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
              alt="demoLogo"
            />
          </div>
          <div>
            <h3 className="capitalize">hello,</h3>
            {/* <h4  className="capitalize font-semibold text-purple-600">{ auth.user.name}</h4> */}
            <h4 className="capitalize font-semibold text-lg text-purple-600">
              sunil kumar sahoo
            </h4>
          </div>
        </div>
        <div className="col-span-7 md:w-[50vw]   p-2 ">
          <div className="uppercase  text-xl my-1 text-center font-bold text-gray-700">
            my <span className="text-purple-600">wishlist</span> (
            {wishlist.length})
          </div>
          <hr />
          {wishlist.map((item) => {
            return (
              <Link
                key={item?.products._id}
                to={`/single-product/${item?.products.slug}`}
                className="flex bg-white  w-auto gap-4  rounded-md shadow-md hover:shadow-lg p-2 items-start my-3 "
              >
                <div className="w-[100px] h-[100px]">
                  <img
                    className="h-[100%] w-[100%] rounded"
                    src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${item?.products._id}`}
                    alt={item?.products.name}
                  />
                </div>
                <div>
                  <h1 className="capitalize mb-4 font-semibold text-md hover:text-blue-500">
                    {item?.products.name}...
                  </h1>
                  <h3 className=" font-bold text-xl text-green-500 ">
                    ₹{item?.products.price}{" "}
                    <span className="line-through text-gray-500 font-medium text-sm ml-2">
                      ₹
                      {item?.products.price +
                        (
                          item?.products.price *
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
                  className="ml-auto text-2xl hover:text-red-600 text-slate-500"
                >
                  <MdDelete />
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
