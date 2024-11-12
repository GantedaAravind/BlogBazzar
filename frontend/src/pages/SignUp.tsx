import { MdOutlineMailLock } from "react-icons/md";
// import signupImage from "../assets/signupImage.svg";
import { IoMdKey } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { TbLoader2 } from "react-icons/tb";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../config";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { PiUserCirclePlusFill } from "react-icons/pi";
import imageToBase64 from "../helper/imageToBase64";
import playSound from "../common/playSound";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SignUp = () => {
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
    if (name === "name") {
      setName(value);
    }
  };

  const signupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    playSound();
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/user/signup", {
        email,
        password,
        name,
        profilePicture,
      });

      const dataResponse = response.data;

      // console.log(dataResponse);

      if (dataResponse.success) {
        // toast.success(dataResponse.message);
        setEmail("");
        setName("");
        setPassword("");
        navigate("/login");
      } else {
        throw new Error(dataResponse.message);
      }

      // console.log(email, password);
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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      toast.error(" Please choose an image...😏");
      return;
    }

    const file = event.target.files[0];
    // Define the size limit (2 MB in bytes)
    const maxSizeInBytes = 1 * 1024 * 1024;

    // Check if the file exists and its size
    if (file) {
      if (file.size > maxSizeInBytes) {
        toast.error("File size exceeds 1 MB...😮");
        return;
      }

      try {
        const base64Image = await imageToBase64(file);
        setProfilePicture(base64Image);
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-110px)] flex items-center justify-around ">
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
        className="flex items-center  shadow-purple  w-fit border-2 border-purple-500  p-4   rounded-md"
      >
        <div className="hidden md:block">
          <LazyLoadImage
            effect="blur"
            src="/signupImage.svg"
            alt="Login"
            className="md:h-80 lg:h-96"
          />
        </div>
        <div className="flex items-center  md:px-4">
          <div className="">
            <div className="flex justify-around items-center ">
              <div className="cursor-pointer relative  w-22  overflow-hidden">
                {profilePicture === "" ? (
                  <p className="text-4xl md:text-5xl cursor-pointer text-center pl-4  ">
                    <PiUserCirclePlusFill />
                  </p>
                ) : (
                  <div className=" flex items-center justify-around">
                    <LazyLoadImage
                      effect="blur"
                      src={profilePicture}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                      alt="User Image"
                    />
                  </div>
                )}

                <p className="w-full text-xs md:text-sm">Upload Image</p>
                <form className="">
                  <label className="absolute inset-0 cursor-pointer">
                    <input
                      type="file"
                      className="opacity-0"
                      onChange={handleImageUpload}
                    />
                  </label>
                </form>
              </div>
            </div>
            <form
              className="mx-3 my-4  flex flex-col items-center justify-around"
              onSubmit={signupHandler}
            >
              <div className="mt-2 sm:mt-4 md:mt-6 lg:mt-8  flex items-center  gap-2 border-b-2 ">
                <label
                  className=" text-base sm:text-md md:text-lg lg:text-xl  cursor-pointer "
                  htmlFor="name"
                >
                  <FaUserGraduate />
                </label>
                <input
                  type="name"
                  name="name"
                  value={name}
                  id="name"
                  placeholder="Enter the Name..."
                  className="rounded-t  pl-2  outline-none bg-transparent text-sm sm:text-base md:text-md lg:text-lg  py-1 w-56 md:w-64 lg:w-72"
                  autoComplete="off"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex items-center  gap-2 border-b-2 mt-2 lg:mt-4">
                <label
                  className="text-base sm:text-md md:text-lg lg:text-xl  cursor-pointer "
                  htmlFor="email"
                >
                  <MdOutlineMailLock />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter the Email..."
                  className="rounded-t  pl-2  outline-none bg-transparent text-sm sm:text-base md:text-md lg:text-lg  py-1 w-56 md:w-64 lg:w-72"
                  autoComplete="off"
                  onChange={handleChangeInput}
                />
              </div>

              <div className="flex items-center  gap-2 border-b-2 mt-2 lg:mt-4 ">
                <label
                  className="text-base sm:text-md md:text-lg lg:text-xl  cursor-pointer "
                  htmlFor="password"
                >
                  <IoMdKey />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter the password..."
                  className="rounded-t  pl-2  outline-none bg-transparent text-sm sm:text-base md:text-md lg:text-lg  py-1 w-56 md:w-64 lg:w-72"
                  autoComplete="off"
                  value={password}
                  onChange={handleChangeInput}
                />
              </div>

              <button
                className="text-base sm:text-md md:text-lg lg:text-xl hover:bg-white hover:text-purple-600 font-medium  hover:scale-110 transition-all bg-purple-600 px-4 py-1 rounded mt-8 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 disabled:bg-purple-500  disabled:text-white"
                disabled={loading}
              >
                <div className="flex items-center  gap-2">
                  <p>Sign Up</p>

                  {loading && (
                    <span className="animate-spin  ">
                      <TbLoader2 />
                    </span>
                  )}
                </div>
              </button>
            </form>
            <p className="text-sm sm:text-base md:text-md lg:text-lg capitalize pl-4 my-1 sm:my-2 md:my-3 lg:my-5 font-normal ">
              Already have an account?{" "}
              <Link
                to="/login"
                onClick={() => {
                  playSound();
                }}
                className="text-red-500 capitalize hover:underline cursor-pointer "
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
