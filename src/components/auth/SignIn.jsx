import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
        { email, password }
      );

      if (res.data.success) {
        console.log(res.data);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        localStorage.setItem("token", JSON.stringify(res.data.token));

        // toast.success(res.data.message);
        navigate(location.state || "/");

        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);

      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <Layout>
        <form
          onSubmit={loginSubmit}
          className="bg-grey-lighter h-[83vh]  flex flex-col"
        >
          <div className="grid grid-cols-10 mx-auto  items-center justify-center px-2">
            <div className="col-span-10 w-full md:w-2/3 mx-auto order-2 md:order-1  md:col-span-5 px-5 py-8 rounded  text-black ">
              <h1 className="mb-5 text-3xl uppercase font-bold text-[#9B59B6] text-center">Login</h1>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-white"
                name="email"
                placeholder="Enter Email"
              />
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-white"
                name="password"
                placeholder="Enter Password"
              />
         
                <Link
                  to={"/reset"}
                  className="text-sm text-gray-600 underline"
                >
                  Forgot password
                </Link>
                <button
                  type="submit"
                  className="w-full text-center py-2 rounded bg-[#9B59B6] text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Login
                </button>
            
              <div className="text-grey-dark mt-6 text-center">
                Dont have account?
                <Link
                  className="underline mx-2 font-semibold hover:text-gray-800 border-b border-blue text-blue"
                  to="/signup"
                >
                  Register
                </Link>
              </div>
            </div>
            <div className="col-span-10 md:order-2  md:col-span-5">
              <img className="h-[90%] w-[90%]" src="/images/login.svg" alt="loginbg"  />
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default SignIn;
