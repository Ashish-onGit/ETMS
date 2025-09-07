import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const loading = useSelector((state) => state.auth.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-[1000]">
      <div className="flex space-x-2">
        <div
          className="w-3 h-3 bg-purple-700 rounded-full animate-bounce"
          style={{ animationDuration: "1s", animationDelay: "-0.32s" }}
        ></div>
        <div
          className="w-3 h-3 bg-purple-700 rounded-full animate-bounce"
          style={{ animationDuration: "1s", animationDelay: "-0.16s" }}
        ></div>
        <div
          className="w-3 h-3 bg-purple-700 rounded-full animate-bounce"
          style={{ animationDuration: "1s", animationDelay: "0s" }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
