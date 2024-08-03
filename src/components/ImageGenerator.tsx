import { FC } from "react";
import { User } from "../app/page";

interface ImageGeneratorProps {
  user: User;
}

const ImageGenerator: FC<ImageGeneratorProps> = (user) => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-white rounded-2xl pl-5 pr-5 pt-5 pb-5 flex flex-col items-center shadow-lg">
          {/* adding extra div to h1 to add visibility aniamation  */}
          <div className=" visible-heading">
            <h1 className="gradient font-bold text-[5vw]">
              Hello <span className="">Harshit !!</span>
            </h1>
          </div>
          <h1 className="font-bold text-[3vw]  visible-heading">
            What can i generate for you today !!
          </h1>
        </div>

        {/* prompt area */}
        <div className="flex gap-3">
          <div className="p-4 shadow-xl rounded-xl bg-white flex gap-4 w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[80%]">
            <input
              placeholder="Enter your query please"
              className=" focus:outline-none placeholder:font-bold w-full"
            />
          </div>
          <button className="p-3 gradient-bg text-white w-[20vw] sm:w-[30vw] rounded-2xl shadow text-[10px] lg:text-[12px] font-semibold">
            Generate
          </button>
        </div>

        {/* response area */}
        <div className="flex p-9 bg-white justify-center items-center gap-5">
          <img className="h-[25px] w-[25px]" src="/construction.svg" />
          <h1 className="font-bold text-[15px]">
            The builders are trying their best. Come back soon !!
          </h1>
        </div>
      </div>
    </>
  );
};

export default ImageGenerator;
