import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
function App() {
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
