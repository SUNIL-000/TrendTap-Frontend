// Dashboard.js
import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { MdViewQuilt } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate=useNavigate();
  useEffect(()=>{
    navigate('/dashboard/admin/create-product');
  },[])
  return (
    <Layout>
    
      <div className="grid grid-cols-1 sticky md:grid-cols-10 mx-3 flex-wrap">
        <div className="col-span-2 capitalize  px-3 mx-3 text-sm  md:text-lg font-semibold ">
          <ul className=" flex flex-col justify-start " >
            <li className="bg-[#fff] m-3 cursor-pointer p-2 rounded shadow-md">
               <Link to="/dashboard/admin/user"className=" flex gap-1 item-center">
                <span>
                  <FaUserAlt />
                </span>
                <span>admin</span>
              </Link>
            </li>

            <li className="bg-[#fff] cursor-pointer m-3 p-2 rounded shadow-md">
              <Link className="flex items-center gap-1 " to="/dashboard/admin/catagory">
                <span>
                  <IoMdCreate />
                </span>
                Categories
              </Link>
            </li>


            <li className="bg-[#fff]  cursor-pointer m-3 p-2 flex rounded shadow-md">
              <Link className="flex items-center gap-1 " to="/dashboard/admin/create-product">
                <span>
                  <BiSolidCategoryAlt />
                </span>{" "}
                Create Product
              </Link>
            </li>

            <li className="bg-[#fff]  cursor-pointer m-3 p-2 rounded shadow-md">
              <Link className="flex items-center gap-1 " to="/dashboard/admin/products">
                <span>
                  <MdViewQuilt />
                </span>
                Products
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-8">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
