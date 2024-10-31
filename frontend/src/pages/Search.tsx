import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { blogType } from "../common/someDataTypes";
import axiosInstance from "../config";
import toast from "react-hot-toast";
import axios from "axios";
import SimpleBlog from "../components/SimpleBlog";

const Search = () => {
  // Access the current URL's query parameters
  const location = useLocation();

  // Extract the 'query' parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || ""; // Fallback to an empty string if query is null

  // State for search results and loading status
  const [searchBlogs, setSearchBlogs] = useState<blogType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch search results based on query
  const fetchSearchResults = async (query: string) => {
    if (!query) return; // Avoid fetching if query is empty

    setLoading(true);
    try {
      const response = await axiosInstance.get("/blog/search", {
        params: { query: encodeURIComponent(query) }, // Pass query as a parameter
      });

      const dataResponse = response.data;

      if (dataResponse.success) {
        setSearchBlogs(dataResponse.data);
        // toast.success(dataResponse.message);
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false); // Ensure loading is reset
    }
  };

  // UseEffect to trigger search when query changes
  useEffect(() => {
    const t = setTimeout(()=>{
      fetchSearchResults(query);
    },300)
    return ()=>{
      clearTimeout(t);
    }
  }, [query]);

  return (
    <div className="w-[90%] mx-auto">
      <h2 className="text-base sm:text-md md:text-lg lg:text-xl ">Search Results : {searchBlogs.length}</h2>
      {loading ? (
        <div className="flex justify-around">
          <img
            src="/loading.gif"
            alt="loading"
            className="mix-blend-color-dodge w-[50%] "
          />
        </div>
      ) : (
        <div>
          {searchBlogs.length > 0 ? (
            searchBlogs.map((blog) => {
              return (
                <SimpleBlog
                  key={blog._id}
                  _id={blog._id}
                  showDelete={false}
                  authorId={blog.authorId}
                  content={blog.content}
                  createdAt={blog.createdAt}
                  title={blog.title}
                  category={blog.category}
                  featuredImage={blog.featuredImage}
                />
              );
            })
          ) : (
            <div className="w-[60%] mx-auto">
              <img src={"/page-not-found.svg"} />
              <p className="text-center text-2xl my-4 font-semibold ">
                No Blogs Found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
