import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosInstance from "../config";
import { blogType } from "../common/someDataTypes";
import SimpleBlog from "../components/SimpleBlog";

const Cetegory = () => {
  const { category } = useParams<{ category: string }>(); // Type the useParams
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCetegoryBlogs = async (category: string) => {
    setLoading(true);
    try {
      // Convert hyphenated string to title case
      const c = category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      console.log(c);

      const response = await axiosInstance.get(`/blog/category/${c}`);

      const dataResponse = response.data;

      if (dataResponse.success) {
        setBlogs(dataResponse.data);
        // toast.success(dataResponse.message);
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (err) {
      // Type assertion for better error handling
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false); // Ensure loading is set to false in finally block
    }
  };

  useEffect(() => {
    if (category) {
      fetchCetegoryBlogs(category);
    }
  }, [category]); // Include category in the dependency array

  return (
    <div>
      {loading ? (
        <div className="flex justify-around">
          <img
            src="/loading.gif"
            alt="loading"
            className="mix-blend-color-dodge w-[50%] "
          />
        </div>
      ) : (
        <div className="w-[80%] mx-auto  ">
          {blogs.length === 0 ? (
            <div className="w-[80%] mx-auto">
              <img src={"/page-not-found.svg"} />
              <p className="text-center text-2xl my-4 font-semibold ">
                No Blogs Found
              </p>
            </div>
          ) : (
            <div>
              {blogs.map((blog) => (
                <SimpleBlog
                  key={blog._id}
                  _id={blog._id}
                  showDelete={false}
                  category={blog.category}
                  authorId={blog.authorId}
                  content={blog.content}
                  createdAt={blog.createdAt}
                  title={blog.title}
                  featuredImage={blog.featuredImage}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cetegory;
