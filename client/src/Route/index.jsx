import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLayout from "../layouts/AdminLayout";
import CheckAdmin from "../layouts/CheckAdmin";
import UserLayout from "../layouts/UserLayout";
import UpdateProfile from "../pages/UpdateProfile";
import TrackOrder from "../pages/TrackOrder";
import AdminCreateCategory from "../pages/AddCatgeory";
import AdminProduct from "../pages/AdminProduct";
import AddBlog from "../pages/AdminBlogPage";
import CheckOrders from "../pages/AdminManageOrders";
import AboutUs from "../pages/About";
import ProductsPage from "../pages/ProductsPage";
import BlogPage from "../pages/Blog";
import BlogsLayout from "../layouts/BlogsLayout";
import DetailedBlogPage from "../pages/DetailedBlogPage";
import CheckoutPage from "../pages/CheckOutPage";
import WorkshopPage from "../pages/WorkShop";
import FeedbackPage from "../pages/Feedback";
import UserWorkshopPage from "../pages/UserWorkshopPage";
import FeedbackForm from "../components/feedbackform";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "*",
        element: <h1>Not found</h1>,
      },
      { path: "", element: <Home /> },
      { path: "about", element: <AboutUs /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "shop", element: <ProductsPage /> },
      { path: "workshop", element: <UserWorkshopPage /> },
      { path: "feedback", element: <FeedbackForm /> },

      {
        path: "blogs",
        element: <BlogsLayout />,
        children: [
          {
            path: "allblog",
            element: <BlogPage />,
          },
          {
            path: ":id",
            element: <DetailedBlogPage />,
          },
        ],
      },

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
          {
            path: "workshop",
            element: <WorkshopPage />,
          },
          {
            path: "feedback",
            element: <FeedbackPage />,
          },
        ],
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ],
  },
]);

export default router;
