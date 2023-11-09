import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";

// import CreateCatagory from "../components/layout/CreateCatagory";

const CatagoryList = () => {
  const [catagory, setCatagory] = useState([]);
  const [name, setName] = useState("");
  const [loadCatagory, setLoadCatagory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [catId, setCatId] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/catagory/create-catagory`,
        { name }
      );
      if (data.success) {
        console.log(data);
        setLoadCatagory("load");
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
        setCatagory(data?.catagory);
        setLoadCatagory("ok");
        setName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCatagory();
  }, [loadCatagory]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/catagory/delete-catagory/${id}`
      );
      if (data.success) {
        fetchCatagory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handletoggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/catagory/update-catagory/${catId}`,
        { name: updatedName }
      );
      if (data.success) {
        alert(data.message);
        setLoadCatagory("load");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex m-2 gap-3 justify-center items-center">
            
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="bg-gray-50 p-2 focus:ring-0 shadow-md border-none outline-none capitalize"
                required
                placeholder="Create Catagory"
              />
            

            <button
              type="submit"
              className="text-white uppercase shadow-md bg-[#34495E] p-2 rounded-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="relative w-full overflow-x-auto md:w-[50%] mx-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-gray-700 uppercase bg-[#E5E7E9] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Catagory
              </th>
              <th scope="col" className="px-6 py-3">
               {" "} Action
              </th>
            </tr>
          </thead>
          <tbody>
            {catagory.map((catagory) => {
              return (
                <tr
                  className="bg-white border-b dark:border-gray-700  "
                  key={catagory._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-xl font-medium text-gray-900 capitalize "
                  >
                    {catagory.name}
                  </th>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        handletoggle();
                        setUpdatedName(catagory.name);
                        setCatId(catagory._id);
                      }}
                      className="text-3xl ms-2 text-[#5D6D7E] p-1 rounded-sm"
                    >
                      <MdCreate />
                    </button>
                    <button
                      className="text-3xl  ms-2 text-[#E74C3C] p-1 rounded-sm"
                      onClick={() => handleDelete(catagory._id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Modal
          footer={null}
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        >
          <h1>update catagory</h1>
          <form onSubmit={handleUpdate}>
            <div>
              <div className="mb-6">
                <input
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  type="text"
                  className="bg-gray-50 border capitalize"
                  required
                  placeholder="update Catagory"
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 p-2 rounded-sm"
              >
                update
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default CatagoryList;
