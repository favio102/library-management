import React from "react";

const BookCardSkeleton = () => {
  return (
    <div className="w-full h-fit  max-w-lg md:hover:shadow-lg transition-all duration-150 ease-linear p-3 md:p-4 rounded-2xl   md:hover:border group animate-pulse bg-white dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300 border dark:border-zinc-400 justify-center items-center mt-7">
      <div className="flex w-full h-36 mt-2 justify-center items-center">
        <div className="w-44 h-full rounded bg-gray-400 dark:bg-slate-400"></div>
      </div>
      <div className="w-full mt-2 p-2 h-fit">
        <div className="flex flex-col w-full items-center justify-between gap-4">
          <div className="flex gap-2 items-center justify-center w-32 max-w-xs">
            <span className="text-gray-400 text-sm h-3 bg-gray-400 dark:bg-slate-400 w-full"></span>
          </div>
          <div className="flex gap-2 items-center justify-center max-w-xs w-32">
            <span className="text-gray-400 text-sm h-3 bg-gray-400 dark:bg-slate-400 w-full"></span>
          </div>
          <div className="flex gap-2 items-center justify-center max-w-xs w-32">
            <span className="text-gray-400 text-sm h-3 bg-gray-400 dark:bg-slate-400 w-full"></span>
          </div>
          <div className="w-32 h-10 rounded-full bg-gray-400 dark:bg-slate-400 mt-4 "></div>
        </div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;
