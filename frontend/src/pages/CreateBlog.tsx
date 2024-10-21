import { useRef, useState } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import listOfCategories from "../common/categories";
import { TbLoader2 } from "react-icons/tb";
import uploadImage from "../helper/uploadImage";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../config";
import playSound from "../common/playSound";

const CreateBlog = () => {
  const editor = useRef<Jodit | null>(null); // Reference to the editor

  const intialData = {
    title: "",
    category: "",
    tags: "",
  };
  const [data, setData] = useState(intialData);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input

  const [imageUrl, setImageUrl] = useState<string>("");

  const handleOnChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: 320,
  };

  const handleCreatePost = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/blog/create-blog", {
        title: data.title,
        content,
        featuredImage: imageUrl,
        category: data.category,
        tags: data.tags.split(",").map((tag) => tag.trim().toLocaleLowerCase()),
      });

      const dataResponse = response.data;

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        setData(intialData);
        setContent("");
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the file input
        }
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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const uploadPromise = uploadImage(file); // Create the promise first

        toast.promise(uploadPromise, {
          loading: "Uploading image...",
          success: "Image uploaded successfully!",
          error: "Failed to upload image. Please try again.",
        });
        const result = await uploadPromise;
        setImageUrl(result.url); // Update the image URL after upload
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="flex justify-around">
      <form className="w-fit max-w-[95%]">
        {/* Blog Title Input */}
        <div className="flex items-center gap-2 md:gap-4 lg:gap-6 ">
          <label htmlFor="title" className="text-md sm:text-lg md:text-xl lg:text-2xl font-medium">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={data.title}
            onChange={handleOnChange}
            className="block p-1 outline-none bg-transparent border-b-2 w-[60%] mx-6 my-2"
          />
        </div>

        <div className="flex md:items-center flex-col md:flex-row ">
          <div className="flex items-center justify-start mt-4 ">
            <p className="text-white text-base sm:text-md md:text-lg lg:text-xl font-medium  w-40">Cover Photo</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className=" ml-4 w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100
                      focus:outline-none"
            />
          </div>

          <div className="my-4 ">
            <p className="text-base sm:text-md md:text-lg lg:text-xl font-medium inline">Catrgory </p>
            <select
              className="bg-transparent mx-4 text-center  w-[60%] md:w-64 lg:w-72 outline-none border-b-2 p-1 cursor-pointer"
              onChange={handleOnChange}
              name="category"
              value={data.category}
            >
              <option className="bg-[#181427] " value="">
                Select Category
              </option>
              {listOfCategories.map((category, idx) => {
                return (
                  <option className="bg-[#181427]" value={category} key={idx}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Jodit Editor */}
        <div className="">
          <div className="text-white text-base sm:text-md md:text-lg lg:text-xl my-4 font-medium">
            Content Of Your Blog:
          </div>
          <div className="text-black sm:mx-4 md:mx-10 lg:mx-20  justify-center ">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)} // handle content change
            />
          </div>
        </div>

        <div className="flex items-center gap-9">
          <p className="text-base sm:text-md md:text-lg lg:text-xl font-medium ">Tags</p>
          <input
            type="text"
            onChange={handleOnChange}
            placeholder="keyword1, keyword2..."
            name="tags"
            value={data.tags}
            className="block p-1 outline-none bg-transparent border-b-2 w-72 mx-6 my-2"
          />
        </div>

        <div className="flex items-center justify-around my-4">
          <button
            onClick={()=>{
              playSound();
              handleCreatePost}
            }
            disabled={loading}
            className="bg-purple-500 flex items-center gap-2  px-4 font-medium text-sm sm:text-base md:text-md lg:text-lg py-1 rounded disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105 hover:bg-white hover:text-purple-500 "
          >
            <span>Create Post</span>
            {loading && (
              <div className="w-fit animate-spin text-xl">
                <TbLoader2 />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
