import { Link } from "react-router-dom";
import { blogType } from "../common/someDataTypes";

const TrendingBlog = (props: blogType) => {
  return (
    <Link 
      to={`/blog/${props._id}`} 
      className="flex w-full border-2 border-zinc-500 rounded gap-3 transition-transform duration-300 ease-in-out hover:shadow-lgrounded-lg shadow-md"
    >
      <div className="w-fit rounded-md overflow-hidden shadow-md">
        <img 
          src={props.featuredImage} 
          className="h-[100px] w-[140px] md:h-[120px] md:w-[160px] lg:h-[140px] lg:w-[200px] object-cover" 
          alt={props.title || ""} 
        />
      </div>
      <div className="flex-1">
        <p className="line-clamp-1 text-md md:text-lg lg:text-xl font-semibold ">
          {props.title}
        </p>
        <div 
          className="line-clamp-4 text-sm mt-2" 
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></div>
      </div>
    </Link>
  );
};

export default TrendingBlog;
