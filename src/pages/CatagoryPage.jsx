import React, { useEffect, useState } from "react";
import { useParams,useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios from "axios";
import ProductCard from "../components/layout/ProductCard";
import { useAuth } from "../context/authContext";

const CatagoryPage = () => {
  const [auth] = useAuth();
  const { id } = useParams();
  const navigate=useNavigate();
  const location=useLocation();
  const [product, setProduct] = useState([]);

  const getProductByCatagory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-cat-products/${id}`
      );

      if (data.success) {
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductByCatagory();
   
      // Check if the user is authenticated after 3 seconds and redirect if not
      const redirectTimeout = setTimeout(() => {
        if (!auth?.token) {
          navigate("/signin",{state:location.pathname}); // Redirect to the signin page
        }
      }, 3000); // 3000 milliseconds (3 seconds)
  
      return () => {
        clearTimeout(redirectTimeout); // Clear the timeout if the component unmounts
      };

  
  }, [id,auth]);
  return (
    <Layout>
      {auth?.token ? (<div className="w-full mx-auto md:w-[90vw] flex justify-center items-center gap-2 md:gap-4 flex-wrap">
        {product.length > 0 ? (
          <ProductCard product={product} />
        ) : (
          <h1 className="capitalize text-2xl">No product found</h1>
        )}
      </div>): <h1>please login first</h1>}
    </Layout>
  );
};

export default CatagoryPage;
