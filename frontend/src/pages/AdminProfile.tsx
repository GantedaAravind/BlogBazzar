import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../config";
import { Link, useNavigate } from "react-router-dom";
import { IoCloudUploadSharp } from "react-icons/io5";
import SimpleBlog from "../components/SimpleBlog";
import { blogType } from "../common/someDataTypes";
import moment from "moment";

type singleUser = {
  _id: string;
  name: string;
  role: string;
  email: string;
  createdAt: string;
};

const AdminProfile = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [Alluser, setAllUsers] = useState<singleUser[]>([]);
  const [allBlogs, setAllBlogs] = useState<blogType[]>([]);
  const [displayUsers, setDisplayUsers] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user/");

      const dataResponse = response.data;

      if (dataResponse.success) {
        // console.log(dataResponse.data);
        setAllUsers(dataResponse.data);
        // toast.success(dataResponse.message);
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

  const fetchAllBlogs = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/blog/");

      const dataResponse = response.data;

      if (dataResponse.success) {
        setAllBlogs(dataResponse.data);
        // console.log(dataResponse.data);
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

  const handleAllUsers = async () => {
    setDisplayUsers(true);
    await fetchUsers();
  };
  const handleAllBlogs = async () => {
    setDisplayUsers(false);
    await fetchAllBlogs();
  };

  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, []);

  return (
    <div className="flex justify-between mx-4">
      <div className="w-full sm:w-[20%] h-[80vh] ">
        <div className="">
          <div className="flex  items-center justify-center mt-8 ">
            <img
              src={user.profilePicture}
              className="w-[250px] h-[250px] sm:w-20 sm:h-20 rounded-full"
            />
          </div>
          <p className="font-semibold text-center text-md mt-2 capitalize">
            {user.name}
          </p>
          <p className="text-center text-xs text-zinc-200 sm:text-sm uppercase">
            {user.role}
          </p>
        </div>
        <div className="hidden sm:block mt-8 ">
          <p
            className={`text-center font-mono font-medium ${
              displayUsers ? "bg-purple-800" : ""
            } py-2 rounded cursor-pointer`}
            onClick={handleAllUsers}
          >
            All Users
          </p>
          <p
            className={` hidden sm:block text-center font-mono font-medium ${
              !displayUsers ? "bg-purple-800" : ""
            } py-2 rounded cursor-pointer`}
            onClick={handleAllBlogs}
          >
            All Blogs
          </p>
        </div>
        <div className="mt-10 flex justify-center  ">
          <Link
            to={"/create-blog"}
            className=" px-3 py-2  flex items-center gap-4 bg-purple-600 rounded hover:bg-white hover:text-purple-500 font-semibold"
          >
            <p className="text-balance sm:text-md md:text-lg lg:text-xl">Create Blog</p>
            <div className="text-lg md:text-xl lg:text-2xl">
              <IoCloudUploadSharp />
            </div>
          </Link>
        </div>
      </div>
      <div className="w-[70%] h-[80vh]  hidden sm:block my-auto overflow-y-scroll p-2 ">
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
          {!loading && displayUsers && (
            <div className="w-full">
              <table className="w-full ">
                <thead>
                  <tr className="bg-purple-800 rounded-md border-2 text-center">
                    <th className="border-r-2 sm:text-base md:text-md lg:text-lg font-semibold">Name</th>
                    <th className="border-r-2 sm:text-base md:text-md lg:text-lg font-semibold">Email</th>
                    <th className="border-r-2 sm:text-base md:text-md lg:text-lg font-semibold">Role</th>
                    <th className="border-r-2 sm:text-base md:text-md lg:text-lg font-semibold">
                      created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Alluser.map((el) => {
                    return (
                      <tr className={``} key={el._id}>
                        <td className="text-center  sm:text-sm md:text-base lg:text-md p-1 border">{el.name}</td>
                        <td className="text-center  sm:text-sm md:text-base lg:text-md p-1 border">{el.email}</td>
                        <td className="text-center  sm:text-sm md:text-base lg:text-md p-1 border">{el.role}</td>
                        <td className="text-center  sm:text-sm md:text-base lg:text-md p-1 border">
                          {moment(el.createdAt).format("DD-MM-YYYY")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {!loading && !displayUsers && (
            <div className="flex flex-col  ">
              {allBlogs.map((blog) => {
                return (
                  <SimpleBlog
                    key={blog._id}
                    _id={blog._id}
                    title={blog.title}
                    content={blog.content}
                    authorId={blog.authorId}
                    category={blog.category}
                    featuredImage={blog.featuredImage}
                    showDelete={true}
                    createdAt={blog.createdAt}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
