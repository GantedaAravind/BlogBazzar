import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../config";
import { Link } from "react-router-dom";
import { blogType } from "../common/someDataTypes";
import moment from "moment";
import playSound from "../common/playSound";

interface propsType extends blogType {
  showDelete: boolean;
}

const SimpleBlog = (props: propsType) => {
  const handleDeleteBlog = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/blog/delete-blog/${id}`);
      const dataResponse = response.data;
      if (dataResponse.success) {
        console.log(dataResponse.data);
        toast.success(dataResponse.message);
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
  };

  return (
    <Link
      onClick={()=>{playSound();}}
      to={`/blog/${props._id}`}
      key={props._id}
      className="border-2 rounded-lg border-zinc-500 w-full p-2 flex my-2 justify-between gap-4 relative"
    >
      <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%]">
        <p className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold line-clamp-1 capitalize mb-2">
          {props.title}
        </p>
        <div className="flex items-center justify-between ">
          <div className="flex  gap-4">
            {props?.authorId.profilePicture === "" ? (
              <div className="rounded-full bg-purple-600 w-12 h-12 text-3xl flex items-center justify-center shadow-lg hover:bg-purple-500 transition duration-300">
                {props?.authorId?.name[0]}
              </div>
            ) : (
              <img
                src={props?.authorId.profilePicture}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full"
              />
            )}

            <div className="flex flex-col ">
              <h2 className="text-xs sm:text-sm md:text-md lg:text-lg">
                {props?.authorId.name}
              </h2>
              <p className="text-xs md:text-sm text-zinc-400">
                {moment(props?.createdAt).format("DD-MM-YYYY")}
              </p>
            </div>
          </div>
          <p className="hidden sm:block text-xs sm:text-sm md:text-md lg:text-lg font-semibold ">
            {props.category}
          </p>
        </div>
        <div
          className="line-clamp-2 md:line-clamp-3 mt-[-10px] no-tailwind"
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></div>
      </div>
      <div>
        <img
          src={props.featuredImage}
          className="h-24 sm:h-32 md:h-36 lg:h-40 aspect-[5/3] rounded-md"
        />
      </div>
      {props.showDelete && (
        <div
          className="absolute right-0 text-2xl p-1 rounded-full hover:bg-purple-500 hover:text-white  text-purple-500 cursor-pointer hover:scale-110 transition-all"
          onClick={() => {
            handleDeleteBlog(props._id);
          }}
        >
          <MdDelete />
        </div>
      )}
    </Link>
  );
};

export default SimpleBlog;
