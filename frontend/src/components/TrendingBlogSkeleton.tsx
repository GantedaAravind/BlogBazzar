export const TrendingBlogSkeleton = () => {
  return (
    <div className="my-1 flex w-full placeholder-wave border-2 border-zinc-500 rounded gap-3 transition-transform duration-300 ease-in-out hover:shadow-lgrounded-lg shadow-md">
      <div className="placeholder m-1 w-fit rounded-md overflow-hidden shadow-md">
        <div className="h-[100px] w-[140px] md:h-[120px] md:w-[160px] lg:h-[140px] lg:w-[200px] object-cover" />
      </div>
      <div className="flex-1 my-1">
        <p className="line-clamp-1 placeholder rounded-sm  text-md md:text-lg lg:text-xl font-semibold w-[80%] ">
        </p>
        <div className="line-clamp-4 text-lg rounded-sm mt-6 placeholder w-[80%] "></div>
        <div className="line-clamp-4 text-lg rounded-sm mt-2 placeholder w-[70%]"></div>
        <div className="line-clamp-4 text-lg rounded-sm mt-2 placeholder w-[60%]"></div>
        <div className="line-clamp-4 text-lg rounded-sm mt-2 placeholder w-[40%]"></div>
      </div>
    </div>
  );
};

export default TrendingBlogSkeleton;
