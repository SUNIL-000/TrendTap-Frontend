import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { Toast } from "react-toastify/dist/components";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/register`,
        { name, email, password, phone, adress, answer }
      );

      if (res.data.success) {
        console.log(res.data.newUser);
        alert(res.data.message);
        navigate("/signin");
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAdress("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAdress("");
    }
  };

  return (
    <>
      <Layout>
        <form
          onSubmit={handleSubmit}
          className="bg-grey-lighter h-[83vh] my-auto flex flex-col"
        >
          <div className="grid grid-cols-10 mx-auto  items-center justify-center px-2">
            <div className="col-span-10 w-full md:w-2/3 mx-auto order-2 md:order-1  md:col-span-5 px-5 py-8 rounded  text-black">
              <h1 className="mb-4 text-[#9B59B6] text-2xl font-bold uppercase text-center">
                register
              </h1>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-white"
                // className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-gray-100"
                name="name"
                placeholder="Name"
              />
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-white"
                // className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-gray-100"
                name="email"
                placeholder="Email"
              />
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                // className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-gray-100"
                name="password"
                className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-white"

                placeholder="Password"
              />
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                // className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-gray-100"
                className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-white"
                name="phone"
                placeholder="Phone"
              />
              <input
                required
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                type="adress"
                className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-white"
                name="adress"
                placeholder="Address"
              />
              <input
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                type="name"
                className="block outline-none focus:border-none border-none w-full p-2 rounded mb-4 bg-white"
                name="adress"
                placeholder="Waht is your favourite sports"
              />
              <button
                type="submit"
                className="w-full text-center py-2 rounded bg-[#9B59B6] text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
              <div className="text-grey-dark mt-6 text-center">
                Already have an account?
                <Link
                  className="underline mx-2 font-semibold hover:text-gray-800 border-b border-blue text-blue"
                  to="/signin"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="col-span-10 md:order-2  md:col-span-5">
              <img className="h-[70%] w-[90%]" src="/images/signup.svg" alt="loginbg"  />
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Signup;
