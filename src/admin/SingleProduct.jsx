import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const { Option } = Select;

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [catagories, setCatagories] = useState([]);
  const [catagory, setCatagory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [pid, setPID] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(Boolean);

  const fetchSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-product/${slug}`
      );
      if (data.success) {
        // console.log(data.products._id)/
        console.log(data.products);
        setQuantity(data.products.quantity);
        setName(data.products.name);
        setCatagory(data.products.catagory._id);
        setPrice(data.products.price);
        setDescription(data.products.description);
        setShipping(data.products.shipping);
        setPID(data.products._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCatagory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/catagory/get-catagory`
      );
      if (data.success) {
        setCatagories(data?.catagory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleProduct();
    fetchCatagory();
  }, [slug]);
  //update-product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productUpdatedData = new FormData();
      productUpdatedData.append("name", name);
      productUpdatedData.append("price", price);
      productUpdatedData.append("quantity", quantity);
      productUpdatedData.append("description", description);
      productUpdatedData.append("photo", photo);
      productUpdatedData.append("shipping", shipping);
      productUpdatedData.append("catagory", catagory);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/product/update-product/${pid}`,
        productUpdatedData
      );
      if (data.success) {
        alert(data.message);
        navigate("");
      }
    } catch (error) {}
  };

  //Delete-product
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/product/delete-product/${pid}`
      );
      if (data.success) {
        alert(data.message);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="text-[#808B96] py-3 text-center w-full text-3xl uppercase font-bold mx-auto">
        update product
      </div>
      {/* select catagory to create product  */}

      <div className="w-full flex flex-col justify-center items-center md:justify-between mt-3 md:flex-row">
        {/* photo section  */}
      <div className="flex flex-col items-center w-1/2 p-3 ">
      <div>
            <label className=" text-base uppercase font-semibold m-3 px-6 py-2 rounded-sm bg-[#F4F6F7]">
              {photo ? photo.name : "Upload image"}

              <input 
               
                type="file"
                name="photo"
                placeholder="Upload photo"
                accept="image/*"
                hidden
                className="p-5 text-xl m-2"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </label>
          </div>
          {photo ? (
          <div>
           
            <img
              src={URL.createObjectURL(photo)}
              alt="uploade image..."
              className="w-2/4 mt-2 p-2 mx-auto"
            />
          </div>
        ) : (
          <img
            src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${pid}`}
            alt={name}
            className="w-2/4 mt-2 p-2 mx-auto"
          />
        )}
      </div>
      {/* photo section end  */}

      <div className="flex mt-4 md:mt-0 gap-3 w-full md:w-1/2 flex-col  justify-center items-center md:items-start p-4">
          {/* catagory section  */}

          <Select
          value={catagory}
          showSearch={true}
          onChange={(value) => setCatagory(value)}
          placeholder="select catagory"
          style={{
            width: "50%",
            height: "50px",
            outline: "none",
            color: "red",
            border: "none",
            
          }}
          className="cursor-pointer "
        >
          {catagories?.map((item) => {
            return (
              <Option key={item._id} value={item._id} className="text-red-300">
                {item.name}
              </Option>
            );
          })}
        </Select>


        <input 
          className="bg-gray-50 w-1/2 py-3 focus:ring-0 shadow-md border-none outline-none capitalize"
          placeholder="Update Product Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input 
          className="bg-gray-50 w-1/2 py-3 focus:ring-0 shadow-md border-none outline-none capitalize"
          placeholder="Update Product price"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <input 
          className="bg-gray-50 w-1/2 py-3 focus:ring-0 shadow-md border-none outline-none capitalize"
          placeholder="Update quantity"
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
         <textarea
            placeholder="Enter description"
            cols="28"
            rows="5"
            required
            className="bg-gray-50 w-1/2 py-3 focus:ring-0 shadow-md border-none outline-none capitalize"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        <Select
          placeholder="shipping"
          showSearch
          className="bg-gray-50 w-1/2 focus:ring-0 shadow-md border-none outline-none capitalize"
          value={shipping ? "Yes" : "NO"}
          onChange={(value) => setShipping(value)}
       
        >
          <Option value={"1"}>Yes</Option>
          <Option value={"0"}>NO</Option>
        </Select>
      </div>
      </div>



      <div className="flex justify-center items-center gap-5 mt-4">
        <button className="bg-[#17A589] rounded-sm shadow-lg p-2 font-semibold text-white uppercase" onClick={handleUpdateProduct}>
          Update
        </button>
     
        <button className="bg-[#E74C3C] rounded-sm shadow-lg p-2 font-semibold text-white uppercase" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </>
  );
};

export default SingleProduct;
