import { FaBloggerB } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../config";
import axios from "axios";
import { TbLoader2 } from "react-icons/tb";
import { logout } from "../store/userSlice";
import playSound from "../common/playSound";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user/logout");

      const dataResponse = response.data;

      // console.log(dataResponse);

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        dispatch(logout());
        navigate("/login");
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

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.trim() === "") {
      navigate("/");
    } else {
      navigate(`/search?query=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className="shadow-purple z-30  fixed w-full bg-[#181427]">
      <div className="flex items-center justify-between w-[90%] mx-auto">
        <Link
          to={"/"}
          className="m-2 flex items-center gap-2"
          onClick={() => {
            playSound();
          }}
        >
          <span className=" text-lg sm:text-xl md:text-2xl lg:text-3xl">
            <FaBloggerB />
          </span>
          <p className="font-medium font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl">
            BlogBazaar
          </p>
        </Link>
        <div className="hidden md:flex my-2  items-center border rounded-full px-1 ">
          <input
            type="text"
            name="search"
            placeholder="Search blog..."
            className="bg-transparent  outline-none px-3 py-1 md:w-72 lg:w-96 text-md lg:text-lg"
            autoComplete="off"
            onChange={handleSearchInput}
          />
          <span className="md:text-xl lg:text-2xl px-1">
            <IoSearch />
          </span>
        </div>
        <div className="flex items-center gap-4">
          {user.loggedIn && (
            <Link
              onClick={() => {
                playSound();
              }}
              to={`${user.role === "admin" ? "admin" : "my"}-profile`}
              className=""
            >
              {user.profilePicture === "" ? (
                <div className="rounded-full bg-purple-500 px-3 text-center py-2 text-base md:text-md lg:text-lg capitalize">
                  {user.name[0]}
                </div>
              ) : (
                <div>
                  <span className="">
                    <LazyLoadImage
                      effect="blur"
                      src={user.profilePicture}
                      className="rounded-full w-8 h-8  lg:w-10 lg:h-10 aspect-square"
                      alt="user Picture"
                    />
                  </span>
                </div>
              )}
            </Link>
          )}
          {user.loggedIn ? (
            <button
              className="disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 disabled:bg-purple-500  disabled:text-white text-base sm:text-md md:text-lg lg:text-xl hover:bg-white hover:text-purple-600 font-medium   transition-all bg-purple-600 px-4 py-1 rounded "
              onClick={() => {
                playSound();
                handleLogout();
              }}
              disabled={loading}
            >
              <div className="flex items-center gap-2">
                <p>Log Out</p>
                {loading && (
                  <span className="animate-spin  ">
                    <TbLoader2 />
                  </span>
                )}
              </div>
            </button>
          ) : (
            <Link
              to={"/login"}
              onClick={() => {
                playSound();
              }}
              className=" text-base sm:text-md md:text-lg lg:text-xl hover:bg-white hover:text-purple-600 font-medium   transition-all bg-purple-600 px-4 py-1 rounded "
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
