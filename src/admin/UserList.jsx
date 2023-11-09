import React from "react";
import { useAuth } from "../context/authContext";

// import { Link } from 'react-router-dom'

const UserList = () => {
  const [auth]=useAuth();
  // console.log(auth?.users)
  return (
    <main className="profile-page">
    
      <section className="relative py-16 bg-blueGray-200">
        <div className="w-[50%] mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
            <div className="px-6">
            
              <div className="text-center flex flex-col justify-center items-center mt-12">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg" alt="..." srcset="" className="w-[20%] h-[20%] -mt-[90px]" />
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-[#9B59B6] ">
                  {auth?.user?.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  
                  {auth?.user?.adress}
                  
                </div>
                <div className="mb-2 text-blueGray-600 mt-4">
                  
                  {auth?.user?.phone}

                </div>
                <div className="mb-2 text-blueGray-600">
                
                  {auth?.user?.email}

                </div>
              </div>
             
            </div>
          </div>
        </div>
      
      </section>
    </main>
  );
};

export default UserList;
