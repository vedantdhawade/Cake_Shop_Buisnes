import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div>
        <section>sider</section>
        <section>
          <Outlet />
        </section>
        <footer>footer</footer>
      </div>
    </>
  );
};

export default AdminLayout;
