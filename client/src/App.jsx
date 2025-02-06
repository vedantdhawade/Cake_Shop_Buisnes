import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./store/userSlice";
import Axios from "./utils/Axios";
import { SummaryApi } from "./common/SummaryApi";
import NavbarBase from "./components/NavbarBase";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const getuserdata = async () => {
    if (token) {
      const response = await Axios({
        ...SummaryApi.getUser,
        data: {
          token: token,
        },
      });
      if (response?.data?.data) {
        dispatch(setUser(response.data.data));
      } else {
        console.log("Error in App : User data is undefined");
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getuserdata();
  }, [token]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <section>
        <Outlet />
      </section>
      <footer>
        <Footer />
      </footer>
      <Toaster />
    </>
  );
}

export default App;
