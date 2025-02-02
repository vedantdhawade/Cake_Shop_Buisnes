import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios.jsx";
import { useNavigate } from "react-router-dom";
import { SummaryApi } from "../common/SummaryApi.jsx";
const Home = () => {
  const [token, setToken] = useState(null);
  const [user, setuser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    // Get the token from localStorage when the component mounts
    const storedToken = localStorage.getItem("token");

    // Set token based on the retrieved value
    if (!storedToken) {
      setToken(false);
    } else {
      setToken(true);
    }
  }, [token]); // Empty dependency array to run only on mount

  const getUser = async () => {
    if (!token) {
      navigate("/login");
    } else {
      const response = await Axios({
        ...SummaryApi.getUser,
        data: {
          token: token,
        },
      });
      setuser(response.data.data);
    }
  };

  return <div>home</div>;
};

export default Home;
