import React, { useState } from "react";
import Layout from "../layout/Layout";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// import { useAuth } from "../../context/authContext";

const ResetPassword = () => {
    const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newpassword, setNewPassword] = useState("");
  //   const [auth, setAuth] = useAuth();

  const loginSubmit = async (e) => {
   
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/reset`,
        { email, newpassword, answer }
      );

      if (res.data.success) {
        console.log(res.data);
        alert(res.data.message)
        toast.success(res.data.message,{
            position:"top-left"
        })
        navigate( "/signin");
        setEmail("");
        setNewPassword("");
        setAnswer("");

      }
    } catch (error) {
      console.log(error);
      toast.error(error);

      setEmail("");
      setNewPassword("");
      setAnswer("");
    }
  };

  return (
    <>
      <Layout>
        <form
          onSubmit={loginSubmit}
          className="bg-grey-lighter h-[83vh] bg-[#f2f1f1d8] flex flex-col"
        >
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-5 py-8 rounded shadow-xl text-black w-full">
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-gray-100"
                name="email"
                placeholder="Enter Email"
              />
              <input
                required
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-gray-100"
                name="newpassword"
                placeholder="Enter New Password"
              />
              <input
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                type="text"
                className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-gray-100"
                name="answer"
                placeholder="What is your favourite sport ?"
              />

              <button
                type="submit"
                className="w-full text-center py-2 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Reset Password
              </button>

          
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default ResetPassword;
