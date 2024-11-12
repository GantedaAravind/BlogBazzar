import { Link } from "react-router-dom";
import { blogType } from "../common/someDataTypes";
import playSound from "../common/playSound";
import { motion } from "framer-motion";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MotionLink = motion(Link);
const TrendingBlog = (props: blogType) => {
  return (
    <MotionLink
      to={`/blog/${props._id}`}
      onClick={() => {
        playSound();
      }}
      className="flex w-full border-2 shadow-purple border-purple-500 rounded gap-3 transition-transform duration-300 ease-in-out hover:shadow-lgrounded-lg "
    >
      <div className="w-fit rounded-md m-1 overflow-hidden shadow-md">
        <LazyLoadImage
          src={props.featuredImage}
          effect = {"blur"}
          className="h-[90px] w-[130px] md:h-[110px] md:w-[150px] lg:h-[130px] lg:w-[190px] object-cover"
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
    </MotionLink>
  );
};

export default TrendingBlog;
