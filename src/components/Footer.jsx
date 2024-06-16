import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white font-bold flex flex-row justify-center items-center fixed bottom-0 w-full">
      <div className="logo font-bold text-white text-2xl ">
        <span className="text-green-400">&lt;</span>
        Dev
        <span className="text-green-400">Pass/&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Created by RayyanBey
      </div>
    </div>
  );
};

export default Footer;
