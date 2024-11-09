export const TrendingBlogSkeleton = () => {
  return (
    <div className="my-1 flex w-full placeholder-wave border-2 items-center  border-zinc-500 rounded gap-3 transition-transform duration-300 ease-in-out hover:shadow-lgrounded-lg shadow-md">
      <div className="placeholder m-1 w-fit rounded-md overflow-hidden shadow-md">
        <div className="h-[80px] w-[120px] md:h-[100px] md:w-[140px] lg:h-[120px] lg:w-[180px] object-cover" />
      </div>
      <div className="flex-1 my-1 ">
        <p className="line-clamp-1 placeholder rounded-sm  text-md md:text-lg lg:text-xl font-semibold w-[80%] ">
        </p>
        <div className="line-clamp-4 text-lg rounded-sm mt-6 placeholder w-[80%] "></div>
        <div className="line-clamp-4 text-lg rounded-sm mt-2 placeholder w-[70%]"></div>
        <div className="line-clamp-4 text-lg rounded-sm mt-2 placeholder w-[50%]"></div>
      </div>
    </div>
  );
};

export default TrendingBlogSkeleton;
