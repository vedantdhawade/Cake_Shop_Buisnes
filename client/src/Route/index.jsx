import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Blog from "../pages/Blog";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLayout from "../layouts/AdminLayout";
import CheckAdmin from "../layouts/CheckAdmin";
import UserLayout from "../layouts/UserLayout";
import UpdateProfile from "../pages/UpdateProfile";
import TrackOrder from "../pages/TrackOrder";
import Workshops from "../pages/Workshop";
import AdminCreateCategory from "../pages/AddCatgeory";
import AdminProduct from "../pages/AdminProduct";
import AddBlog from "../pages/AdminBlogPage";
import CheckOrders from "../pages/AdminManageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "shop", element: <Shop /> },
      { path: "blog", element: <Blog /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "/dashboard",
        element: <UserLayout />,
        children: [
          {
            path: "updateprofile",
            element: <UpdateProfile />,
          },
          {
            path: "trackorder",
            element: <TrackOrder />,
          },
          {
            path: "workshop",
            element: <Workshops />,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <CheckAdmin>
            <AdminLayout />
          </CheckAdmin>
        ),
        children: [
          { path: "addcategory", element: <AdminCreateCategory /> },
          {
            path: "addproducts",
            element: <AdminProduct />,
          },
          {
            path: "addblogs",
            element: <AddBlog />,
          },
          {
            path: "manageorders",
            element: <CheckOrders />,
          },
        ],
      },
    ],
  },
]);

export default router;
