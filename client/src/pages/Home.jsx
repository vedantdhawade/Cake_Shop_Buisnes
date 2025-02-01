import React, { useEffect, useState } from "react";

const Home = () => {
  const [token, setToken] = useState(null);
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

  return <div>home</div>;
};

export default Home;
