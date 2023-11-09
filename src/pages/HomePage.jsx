import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import BannerPage from "../components/layout/BannerPage";
import ProductCard from "../components/layout/ProductCard";
import axios from "axios";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  const [product, setProduct] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-product`
      );

      if (data?.success) {
        console.log(data.products);
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <Layout>
      
      <BannerPage />

      <h1 className="uppercase text-sky-900/100 text-[26px] text-center mt-2 font-bold ">latest products</h1>
      <div className="w-full mx-auto md:w-[90vw] flex justify-center items-center gap-2 md:gap-4 flex-wrap">
        {product ?(<ProductCard product={product.slice(0,8)} />):"No product found"}
        
      </div>
      <div>
        <Footer />  
      </div>
    </Layout>
  );
};

export default HomePage;
