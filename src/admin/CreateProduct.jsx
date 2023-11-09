import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [catagories, setCatagories] = useState([]);
  const [catagory, setCatagory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);

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
    fetchCatagory();
  }, []);
  //create-product
  const handleProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("catagory", catagory);
      productData.append("description", description);
      photo && productData.append("photo", photo);
      productData.append("shipping", shipping);

      console.log(productData);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/product/create-product`,
        productData
      );
      if (data.success) {
        alert(data.message);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      alert("please fill all the required field.")
    }
  };
  return (
    <>
      <div className="text-[#808B96] py-3 text-center w-full text-3xl uppercase font-bold mx-auto">
        create product
      </div>
      {/* select catagory */}
      
      <div className="w-full flex flex-col justify-center items-center md:justify-between mt-3 md:flex-row">
        {/* first half  */}
        <div className="flex flex-col items-center w-1/2 p-3 ">
          <div>
            <label className=" text-base uppercase font-semibold m-3 px-6 py-2 rounded-sm bg-[#F4F6F7]">
              {photo ? photo.name : "Upload photo"}

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
          {photo && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="Uploaded"
                className="w-2/4 mt-2 p-2 mx-auto"
              />
            </div>
          )}
        </div>
        {/* secondhalf  */}
        <div className="flex mt-4 md:mt-0 gap-3 w-full md:w-1/2 flex-col  justify-center items-center md:items-start p-4">
          <Select
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
            className="cursor-pointer"
          >
            {catagories?.map((item) => {
              return (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          {/* {catagory} */}

          <input
            
            className="bg-gray-50 w-1/2 py-3 focus:ring-0 shadow-md border-none outline-none capitalize rounded px-2"
            placeholder="Enter Product Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

          <input
            
            placeholder="Enter Product price"
            type="number"
            className="bg-gray-50 w-1/2 focus:ring-0 shadow-md border-none outline-none py-3 capitalize"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
          <input
            
            placeholder="Enter quantity"
            type="number"
            className="bg-gray-50 w-1/2 py-3 focus:ring-0 shadow-md border-none outline-none capitalize rounded px-2"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            required
          />
          <textarea
            placeholder="Enter description"
            cols="28"
            rows="5"
            required
            className="bg-gray-50 w-1/2 py-3 focus:ring-0 shadow-md border-none outline-none capitalize rounded px-2"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <Select
            placeholder={"shipping"}
            onChange={(value) => setShipping(value)}
            showSearch
            className="bg-gray-50 w-1/2  focus:ring-0 shadow-md border-none outline-none capitalize"
            value={shipping}
            style={{ color: "black" }}
          >
            <Option default value={"1"}>
              YES
            </Option>
            <Option value={"0"}>NO</Option>
          </Select>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4">
        <button
          
          className="bg-[#1ABC9C] py-2  px-2 m-3 rounded-sm shadow-md font-semibold text-white mx-auto uppercase"
          onClick={handleProduct}
        >
          create
        </button>
      </div>
    </>
  );
};

export default CreateProduct;
