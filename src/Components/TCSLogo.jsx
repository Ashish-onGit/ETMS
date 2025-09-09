import React from "react";
import tcsLogo from "../assets/File_TCS Logo.jpg";

const TCSLogo = () => {
  return (
    <div className="fixed bottom-0 flex flex-row items-center justify-center w-full z-50 bg-white p-2">
      <img src={tcsLogo} alt="TCS Logo" className="h-8 w-auto" />
    </div>
  );
};

export default TCSLogo;
