import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../layout/Spinner";

const AdminPrivate = () => {
  const [ok, setOk] = useState(false);
//   const location= useLocation()
  const [auth] = useAuth(); // Removed setAuth as it's not needed
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/user-admin`,{
            headers: {
                Authorization: auth?.token,
              },
        });
    // console.log(res.data)
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        // Handle error here, e.g., setOk(false) or show an error 
        console.error("Error checking authentication:", error);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false); // No token, so not authenticated
    }
  }, [auth?.token]);

  return ok ? <Outlet />:<Spinner path="/"/> 
//    : <Spinner path="/"/>; // Render Outlet (protected content) if authenticated
};

export default AdminPrivate;