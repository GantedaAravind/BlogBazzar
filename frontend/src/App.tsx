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
import { motion, useScroll } from "framer-motion";
import ScrollProgessBar from "./components/ScrollProgessBar";

function App() {
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
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <ScrollProgessBar />
      <Helmet>
        <title>BlogBazzar</title>
      </Helmet>

      <UserContext.Provider value={{ fetchUserDetails }}>
        <Header />
        <main className="min-h-[calc(100vh-36px)]  pt-16">
          <Outlet />
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
