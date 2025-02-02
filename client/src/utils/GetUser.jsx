import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const navigate = useNavigate();
export const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  } else {
    const response = await Axios({
      ...SummaryApi.getUser,
      data: {
        token: token,
      },
    });
    console.log(response.data.data);
  }

  return await response.data.data;
};
