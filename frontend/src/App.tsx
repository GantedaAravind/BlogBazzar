import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserContext from "./context";
import axiosInstance from "./config";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { RootState } from "@reduxjs/toolkit/query";
import { login } from "./store/userSlice";
import { Helmet } from "react-helmet";
import { motion,useScroll } from "framer-motion";
// import ScrollProgessBar from "./components/ScrollProgessBar";

function App() {
  const { scrollYProgress } = useScroll();
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get("/user/details");

      const dataResponse = response.data;

      // console.log(dataResponse.data);

      if (dataResponse.success) {
        // toast.success(dataResponse.message);
        dispatch(login(dataResponse.data));
      } else {
        throw new Error(dataResponse.message);
      }

      // console.log(email,password);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // toast.error(err.response.data.message);
        } else {
          // toast.error(err.message);
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
      <Helmet>
        <title>BlogBazzar</title>
      </Helmet>

      <motion.div
        style={{
          scaleX: scrollYProgress, // Scale horizontally with scroll progress
          transformOrigin: "0 0", // Scale from the left
          height: "4px", // Adjust thickness of the progress bar
          backgroundColor: "#7E22CE", // Progress bar color
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          borderRadius: 100,
          zIndex: 1000, // Keep on top of other elements
        }}
      />
      <UserContext.Provider value={{ fetchUserDetails }}>
        <Header />
        <main className="min-h-[calc(100vh-36px)]  pt-16">
          <Outlet />
        </main>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
