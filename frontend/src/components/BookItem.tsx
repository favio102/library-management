import React from "react";

const BookItem = () => {
  return (
    <div className="card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <div className="flex flex-col">
            <h3 className="font-satoshi front-semibold text-gray-900">
              User Name
            </h3>
            <p className="font-inter text-sm text-gray-400">Email</p>
          </div>
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">description</p>
      <p
        className="font-inner text-sm blue_gradient cursor-pointer"
        onClick={() => ""}
      >
        #tag
      </p>

      <div className="mt-0 flex-right gap-8 border-t border-gray-100 pt-3">
        <button
          className="bg-transparent hover:bg-blue-300 text-blue-900 cursor-pointer py-2 px-4 rounded-full"
          onClick={() => ""}
        >
          Edit
        </button>
        <button
          className="bg-transparent hover:bg-red-300 text-red-800 cursor-pointer py-2 px-4 rounded-full"
          onClick={() => ""}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookItem;
