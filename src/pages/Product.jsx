import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useFilter } from "../context/filterContext";
import { products } from "../components/products";
import { Checkbox, Radio } from "antd";
import ProductCard from "../components/layout/ProductCard";
const Product = () => {
  
  const [product, setProduct] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  console.log(product);
  console.log(catagory);


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
    getAllCategory();
    
  }, []);
  console.log(radio);
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/catagory/get-catagory`
      );
      setCatagory(data?.catagory);
      console.log(data.catagory);
    } catch (error) {}
  };
  const handleFilter = (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        // all.pop(id)
        all = all.filter((val) => val !== id);
      }
      setChecked(all);
    } catch (error) {
      console.log(error);
      console.log("error in product filtering.....");
    }
  };

  const getFilterProducts = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/v1/product/filter-products`,
        { checked, radio }
      );
      console.log(data?.products);
      setProduct(data?.products);
    } catch (error) {}
  };
  // console.log(values);
  useEffect(() => {
    if (checked.length || radio.length) {
      getFilterProducts();
    }
  }, [checked, radio]);
  return (
    <Layout>
    
    <div className="grid grid-cols-12">
      <div className="col-span-3 w-full p-1  capitalize">
        <div className="flex flex-col justify-center ">
        <span className=" px-2 py-1  rounded"> By catagory</span>
          {catagory?.map((c, index) => {
            return (
              <Checkbox
                key={index}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                
              >
                {c.name}
              </Checkbox>
            );
          })}
        </div>
        <div>
          <h1>By price  </h1>
          <Radio.Group  onChange={(e) => setRadio(e.target.value)}>
            {products?.map((p, index) => {
              return (
                <div key={index} className="w-full ">
                  <Radio className="text-yellow-500" value={p.val}>{p.name}</Radio>
                </div>
              );
            })}
          </Radio.Group>
        </div>
      </div>

      <div className="col-span-9 ">
        <div className=" flex justify-center items-center gap-2 md:gap-2 flex-wrap">
          <ProductCard product={product} />
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Product