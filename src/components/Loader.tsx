import React from "react";
import { HashLoader } from "react-spinners";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex h-screen overflow-hidden items-center justify-center">
      <div className="flex gap-3 rounded-2xl bg-white pl-7 pr-7 justify-center items-center lg:w-1/6 h-[60px] shadow-2xl">
        <h1 className="text-[20px] font-bold">Loading</h1>
        <HashLoader size={20}/>
      </div>
    </div>
  );
};

export default Loader;
