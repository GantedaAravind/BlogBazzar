const SimpleBlogSkeletion = () => {
  return (
    <div className="border-2 placeholder-wave rounded-lg border-zinc-500 w-full p-2 flex my-2 justify-between gap-4 relative">
      <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[75%]">
        <p className="text-md placeholder rounded sm:text-xl md:text-2xl lg:text-3xl font-semibold line-clamp-1 capitalize mb-2"></p>
        <div className="flex items-center justify-between w-full ">
          <div className="flex  gap-4 w-full items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full placeholder" />
            <div className="flex flex-col w-[60%] sm:w-[15%]">
              <h2 className="text-md rounded-sm sm:text-md md:text-lg lg:text-xl w-full placeholder "></h2>
              <p className="text-sm md:text-base hidden sm:block text-zinc-400 w-full mt-1 rounded-sm placeholder"></p>
            </div>
          </div>
          <p className="hidden sm:block text-base sm:text-md md:text-lg lg:text-xl font-semibold placeholder w-[30%] rounded-sm"></p>
        </div>
        <div className="mt-2 rounded-sm w-full ">
            <p className=" placeholder block m-1 w-[90%]"></p>
            <p className=" placeholder hidden md:block m-1 w-[80%] "></p>
            <p className=" placeholder hidden md:block m-1 w-[50%]"></p>
        </div>
      </div>
      <div>
        <div className="h-20 placeholder sm:h-32 md:h-36 lg:h-40 aspect-[5/3] rounded-md" />
      </div>
    </div>
  );
};

export default SimpleBlogSkeletion;
