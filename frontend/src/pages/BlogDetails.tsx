import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../config";
import toast from "react-hot-toast";
import axios from "axios";
import { blogType } from "../common/someDataTypes";
import moment from "moment";
import SimpleBlog from "../components/SimpleBlog";

const BlogDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [blogData, setBlogData] = useState<blogType | null>(null);
  const [similarBLogs, setSimilarBlogs] = useState<blogType[]>([]);
  //   const [similarLoading,setSimilarLoading] = useState<boolean>(false);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/blog/details/${id}`);

      const dataResponse = response.data;

      if (dataResponse.success) {
        await fetchSimilarBlog(dataResponse.data.category);
        setBlogData(dataResponse.data);
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
  const fetchSimilarBlog = async (category: string) => {
    // setSimilarLoading(true);
    try {
      const response = await axiosInstance.get(`/blog/category/${category}`);

      const dataResponse = response.data;

      if (dataResponse.success) {
        setSimilarBlogs(dataResponse.data);
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
    // setSimilarLoading(false);
  };
  useEffect(() => {
    fetchBlog();
  }, [id]);

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
        <div className="w-full mt-6">
          <div className="flex w-full  justify-center ">
            <div className=" w-fit  flex flex-col  gap-8 ">
              <img
                className="w-[95%] mx-auto sm:w-[480px] rounded md:w-[600px] lg:w-[800px] aspect-[7/4] "
                src={blogData?.featuredImage}
                alt={blogData?.title + "image"}
              />
              <div className="flex items-center justify-between w-[95%] mx-auto">
                <div className="flex  gap-4">
                  {blogData?.authorId.profilePicture === "" ? (
                    <div className="rounded-full bg-purple-600 w-12 h-12 text-3xl flex items-center justify-center shadow-lg hover:bg-purple-500 transition duration-300">
                      {blogData?.authorId?.name[0]}
                    </div>
                  ) : (
                    <img
                      src={blogData?.authorId.profilePicture}
                      className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full"
                    />
                  )}
                  <div className="flex flex-col">
                    <h2 className="text-md md:text-lg lg:text-xl font-semibold">
                      {blogData?.authorId.name}
                    </h2>
                    <p className="text-xs md:text-sm text-zinc-400">
                      {moment(blogData?.createdAt).format("DD-MM-YYYY")}
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-md lg:text-lg font-semibold ">
                  SoftWare Developement
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center my-6">
            <div
              className="w-[90%] md:w-[60%] no-tailwind"
              dangerouslySetInnerHTML={{ __html: blogData?.content || "" }}
            ></div>
          </div>
          <div>
            {similarBLogs.length === 0 ? (
              <p className="text-xl mx-10">No Similar Blogs Available</p>
            ) : (
              <div className="w-[90%] md:w-[60%] mx-auto">
                <h2 className="text-2xl font-semibold capitalize my-4">
                  Similar Blogs :{" "}
                </h2>
                {similarBLogs.map((blog) => {
                  if (id === blog._id) {
                    return "";
                  }
                  return (
                    <SimpleBlog
                      _id={blog._id}
                      showDelete={false}
                      category={blog.category}
                      title={blog.title}
                      key={blog._id}
                      content={blog.content}
                      authorId={blog.authorId}
                      featuredImage={blog.featuredImage}
                      createdAt={blog.createdAt}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
