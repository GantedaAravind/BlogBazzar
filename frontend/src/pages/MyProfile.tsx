import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IoIosMail } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../config";
import { Link, useNavigate } from "react-router-dom";
import { IoCloudUploadSharp } from "react-icons/io5";
import SimpleBlog from "../components/SimpleBlog";
import { blogType } from "../common/someDataTypes";

const MyProfile = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [allBlogs, setAllBlogs] = useState<blogType[]>([]);

  const fetchMyBlogs = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/blog/my-blogs");

      const dataResponse = response.data;

      if (dataResponse.success) {
        console.log(dataResponse.data);
        setAllBlogs(dataResponse.data);
        // toast.success(dataResponse.message);
      } else {
        throw new Error(dataResponse.message);
      }
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
    if (!user.loggedIn) {
      navigate("/");
    } else {
      fetchMyBlogs();
    }
  }, []);
  return (
    <div className="flex ">
      <div className=" w-[20%] h-[80vh] border-r-2 border-purple-800">
        <div className="">
          <div className="flex  items-center justify-center mt-8 ">
            {user.profilePicture != "" ? (
              <img
                src={user.profilePicture}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <div className="rounded-full bg-purple-500  w-20 h-20 text-center flex items-center justify-center">
                <p className="text-5xl font-medium">{user.name[0]}</p>
              </div>
            )}
          </div>
          <p className="font-semibold text-center capitalize mt-3">
            {user.name}
          </p>
          <p className="text-center text-sm uppercase text-zinc-300">
            {user.role}
          </p>
          <div className="mt-3 px-4">
            <div className="flex sm:gap-2 md:gap-3 items-center">
              <div className="w-fit text-lg sm:text-xl md:text-2xl lg:text-3xl font">
                <IoIosMail />
              </div>
              <p className="text-sm sm:text-base md:text-md ">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center ">
          <Link
            to={"/create-blog"}
            className=" px-4 py-2  flex items-center gap-4 bg-purple-600 rounded hover:bg-white hover:text-purple-500 font-semibold"
          >
            <p>Create Blog</p>
            <div className="text-2xl">
              <IoCloudUploadSharp />
            </div>
          </Link>
        </div>
      </div>
      <div className="w-[75%] h-[85vh] overflow-y-scroll p-2">
        <div className="w-full">
          {loading && (
            <div className="flex justify-around">
              <img
                src="/loading.gif"
                alt="loading"
                className="mix-blend-color-dodge w-[60%] "
              />
            </div>
          )}
          {!loading && (
            <div className="flex flex-col">
              {allBlogs.length == 0 ? (
                <div className="w-[80%] mx-auto">
                  <img src={"/page-not-found.svg"} />
                  <p className="text-center text-2xl my-4 font-semibold ">
                    No Blogs Found
                  </p>
                </div>
              ) : (
                allBlogs.map((blog) => {
                  return (
                    <SimpleBlog
                      key={blog._id}
                      _id={blog._id}
                      title={blog.title}
                      content={blog.content}
                      authorId={blog.authorId}
                      featuredImage={blog.featuredImage}
                      showDelete={true}
                      createdAt={blog.createdAt}
                      category={blog.category}
                    />
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
