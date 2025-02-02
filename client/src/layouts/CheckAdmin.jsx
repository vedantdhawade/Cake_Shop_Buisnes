import React, { Children } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckAdmin = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return <>{user.role === "ADMIN" ? children : <p>Access Denied</p>}</>;
};

export default CheckAdmin;
