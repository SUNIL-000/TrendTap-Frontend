import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import ProductCard from "../components/layout/ProductCard";
// import { BsTypeH1 } from "react-icons/bs";

const Search = () => {
  const [search, setSearch] = useState([]);
  const [product, setProduct] = useState([]);
  const inputRef =useRef();
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-product`
      );
      // console.log(data.products);
      setProduct(data.products);
    } catch (error) {}
  };

  const getSearchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/search/search-products/${search}`
      );
      // console.log(data.products) ;
      setProduct(data?.products);
    } catch (error) {}
  };
  useEffect(() => {
    if (search.length > 0) {
      getSearchProduct();
    } else {
      getAllProduct();
    }
  }, [search]);
  useEffect(() => {
    inputRef.current.focus();
    getAllProduct();
  }, []);
  return (
    <Layout>
      <div className="w-full mx-auto">
        {/* serach bar section  */}
        <div className="text-center">
          <input
            type="text"
            name="search"
            ref={inputRef}
            placeholder="Search Product..."
            className="p-2 text-md w-[20vw] shadow-md rounded-md border-none focus:ring-white active:ring-0 m-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="bg-purple-600 cursor-pointer p-2 rounded-md shadow-2xl text-white capitalize font-semibold">
            search
          </span>
        </div>
        <div className="flex flex-wrap gap-1 md:gap-2 p-2 justify-center">
          {product.length <= 0 ? (
            <h1 className="text-black">No result found </h1>
          ) : (
            <ProductCard product={product} />
          )}
          {/* <ProductCard product={product}/> */}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
