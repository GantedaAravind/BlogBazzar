import { MdOutlineMailLock } from "react-icons/md";
import loginImage from "../assets/loginImage.svg";
import { IoMdKey } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../config";
import { TbLoader2 } from "react-icons/tb";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";
import { RootState } from "../store";
import playSound from "../common/playSound";
import { motion } from "framer-motion";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  if (user.loggedIn) {
    navigate("/");
  }

  const dispatch = useDispatch();

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  };

  const loginHanlder = async (event: React.FormEvent<HTMLFormElement>) => {
    playSound();
    event.preventDefault();
    console.log(email, password); // Log to ensure email and password are set
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      const dataResponse = response.data;

      // console.log(dataResponse);

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        dispatch(login(dataResponse.data));
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        throw new Error(dataResponse.message);
      }

      // console.log(email,password);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
      } else {
        toast.error("Something went wrong");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/");
    }
  }, []);
  return (
    <div className="min-h-[calc(100vh-110px)] flex items-center justify-around">
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 2,
          type: "spring",
        }}
        className="flex h-full  shadow-purple  w-fit border-2 border-purple-500 p-1  sm:p-2 md:p-3 lg:p-4 rounded-md"
      >
        <div className="hidden md:block">
          <LazyLoadImage 
                      effect="blur" src={loginImage} alt="Login" className="md:h-80 lg:h-96" />
        </div>
        <div className="flex items-center  md:px-4   ">
          <div className="">
            <h2 className=" my-2 lg:my-3   text-center text-lg xm:text-xl md:text-2xl lg:text-3xl font-medium text-purple-500 ">
              Log In
            </h2>
            <form
              className=" mx-3 my-4 flex flex-col items-center justify-around"
              onSubmit={loginHanlder}
            >
              <div className="mt-2 sm:mt-4 md:mt-6 lg:mt-8 flex items-center  gap-2 border-b-2 ">
                <label
                  className=" text-base sm:text-md md:text-lg lg:text-xl cursor-pointer "
                  htmlFor="email"
                >
                  <MdOutlineMailLock />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter the Email..."
                  value={email}
                  className="rounded-t pl-2 outline-none bg-transparent text-sm sm:text-base md:text-md lg:text-lg  py-1 w-56 md:w-64 lg:w-72"
                  onChange={handleChangeInput}
                  required={true}
                  autoComplete="off"
                />
              </div>
              <div className="flex items-center  gap-2 border-b-2 mt-2 lg:my-4">
                <label
                  className=" text-base sm:text-md md:text-lg lg:text-xl  cursor-pointer "
                  htmlFor="password"
                >
                  <IoMdKey />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Enter the password..."
                  className="rounded-t  pl-2  outline-none bg-transparent   py-1 w-56 md:w-64 lg:w-72 text-sm sm:text-base md:text-md lg:text-lg "
                  onChange={handleChangeInput}
                  required={true}
                  autoComplete="off"
                />
              </div>

              <button
                className="text-base sm:text-md md:text-lg lg:text-xl hover:bg-white hover:text-purple-600 font-medium  hover:scale-110 transition-all bg-purple-600 px-4 py-1 rounded mt-8 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 disabled:bg-purple-500  disabled:text-white"
                disabled={loading}
              >
                <div className="flex items-center  gap-2">
                  <p>Log In</p>

                  {loading && (
                    <span className="animate-spin  ">
                      <TbLoader2 />
                    </span>
                  )}
                </div>
              </button>
            </form>
            <p className="text-sm sm:text-base md:text-md lg:text-lg capitalize pl-4 my-1 sm:my-2 md:my-3 lg:my-5 font-normal ">
              New to our BlockBazaar?{" "}
              <Link
                to="/sign-up"
                onClick={() => {
                  playSound();
                }}
                className="text-red-500 capitalize hover:underline cursor-pointer pr-3"
              >
                create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
