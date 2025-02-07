import React from "react";
import NavbarBase from "../components/NavbarBase";
import { Outlet } from "react-router-dom";
import IntroPage from "../components/IntroPage";

const BlogsLayout = () => {
  return (
    <>
      <NavbarBase />

      <Outlet />
    </>
  );
};

export default BlogsLayout;
