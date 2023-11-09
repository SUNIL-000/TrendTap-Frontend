import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { GoHeartFill } from "react-icons/go";
import { BsChevronCompactDown } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { ImSearch } from "react-icons/im";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [catagory, setCatagory] = useState([]);
  const [dropArrow, setDropArrow] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.clear();
  };
  const handleCatagory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/catagory/get-catagory`
      );
      // console.log
      if (data.success) {
        setCatagory(data.catagory);
        // console.log(data.catagory)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleCatagory();
  }, []);
  return (
    <>
      <nav className="bg-[#ECF0F1] uppercase shadow-md sticky top-0 z-10 text-[#2E4053] rounded-sm">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="" className="flex justify-center items-center ">
            <img
              width="38"
              height="38"
              src="/images/logo.png"
              alt="shopping-cart"
            />
            <span className=" ml-2 text-2xl font-bold whitespace-nowrap ">
              TrendTap
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only"></span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className="hidden w-full md:block md:w-auto "
            id="navbar-default"
          >
            <ul className=" flex flex-col justify-center items-center font-bold p-4 md:p-0 mt-4  rounded-lg md:flex-row md:space-x-1 md:mt-0  ">
              <li className=" px-3 block md:flex items-center gap-3">
                <Link to="/wishlist" className="hover:text-purple-600">
                  <GoHeartFill style={{ fontSize: "26px" }} />
                </Link>

                <Link to="/cart" className="hover:text-purple-600">
                  <FaShoppingCart style={{ fontSize: "25px" }} />
                </Link>
                <Link to="/search" className="hover:text-purple-600">
                  <ImSearch style={{ fontSize: "22px" }} />
                </Link>
              </li>
              <li className="px-3 hover:text-purple-600 ">
                <Link to="/">Home</Link>
              </li>

              <li
                onMouseMove={() => {
                  setDropArrow(true);
                }}
                onMouseLeave={() => {
                  setDropArrow(false);
                }}
                className="cursor-pointer px-3 flex relative items-center"
              >
                Category{" "}
                {dropArrow ? <IoIosArrowUp /> : <BsChevronCompactDown />}
                <ul
                  className={`${
                    dropArrow ? "visible" : "hidden"
                  }  absolute capitalize font-medium  md:top-4 text-md gap-2 p-1 md:my-2 bg-white rounded-md`}
                >
                  {catagory?.map((data, index) => {
                    return (
                      <li
                        key={index}
                        className="my-1 rounded hover:bg-gray-100 w-full px-4 py-[2px]"
                      >
                        <Link to={`/catagory/${data._id}`}>{data.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="px-3 rounded-sm py-2 ">
                    <Link
                      to="/signin"
                      className="hover:text-purple-600  justify-center items-center font-bold rounded-lg md:flex-row md:space-x-8 md:mt-0  "
                    >
                      login
                    </Link>
                  </li>
                  <li className="px-3 rounded-md py-2 bg-[#9B59B6] hover:text-gray-200 text-white">
                    <Link
                      to="/signup"
                      className="flex flex-col justify-center items-center font-bold px-4 md:p-0 mt-4  rounded-lg md:flex-row md:space-x-8 md:mt-0  "
                    >
                      SignUp
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:text-purple-600 ">
                    <Link
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="px-4 hover:text-purple-600 ">
                    <Link to={"/signin"} onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
