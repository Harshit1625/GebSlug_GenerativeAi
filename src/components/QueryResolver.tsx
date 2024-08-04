import { FC, KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { User } from "../app/page";
import Loader from "@/components/Loader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { text } from "node:stream/consumers";

interface QueryResolverProps {
  user: User;
}

const QueryResolver: FC<QueryResolverProps> = (user, scroll) => {
  const [query, setQuery] = useState<string>();
  const [data, setData] = useState<
    { quer: string | undefined; response: JSX.Element[] }[]
  >([]);
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

  function textWithBoldTags(result: string) {
    const regex = /\*\*(.*?)\*\*/g;
    const parts = result.split(regex);

    const textWithBoldTags = parts.map((part, index) => (
      <>
        {index % 2 === 0 ? (
          part
        ) : (
          <b className="teal-500">{part.slice(0, -1)}</b>
        )}
        {index !== parts.length - 1 && <br />}
      </>
    ));

    return textWithBoldTags;
  }

  async function dataFetcher() {
    setQuery("");
    const promise = axios
      .post(
        "https://gen-slug-generative-ai.vercel.app/api/generateText",
        { query }
      )
      .then((response) => {
        const result = textWithBoldTags(response.data.result);
        setData((prevData) => [...prevData, { quer: query, response: result }]);
      })
      .catch((e) => console.log(e));

    toast.promise(promise, {
      loading: "Fetching Result",
      success: "Fetched Successfully",
      error: "Some error occurred",
    });
  }

  async function onSub() {
    await dataFetcher();

    // container.current.scrollTop = container.current?.scrollHeight;
  }

  async function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      await dataFetcher();
      setTriggerSearch(false);
      // container.current.scrollTop = container.current?.scrollHeight;
    }
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-4 w-full ">
        <div className="bg-white rounded-2xl pl-5 pr-5 pt-5 pb-5 flex flex-col items-center shadow-lg">
          {/* adding extra div to h1 to add visibility animation  */}
          <div className="visibility-animation">
            <h1 className="gradient font-bold text-[5vw]">
              Hello <span className="">{user.user.firstName} !!</span>
            </h1>
          </div>
          <h1 className="font-bold text-[3vw] visibility-animation">
            How may i assist you today !!
          </h1>
        </div>

        {/* chatting area */}
        <div className="flex flex-col gap-2  ">
          {data.map((value) => (
            <>
              <div className="lg:w-1/2 w-[70%] ml-[30%]  rounded-2xl  visible-heading p-4 pl-7 gradient-bg text-white lg:ml-[50%] shadow-md">
                {value.quer}
              </div>
              <div className="lg:w-1/2 rounded-2xl w-[80%]  visible-heading p-4 pl-7 gap-3 gradient-bg text-white shadow-md flex-col">
                <div>{value?.response}</div>
              </div>
            </>
          ))}
        </div>
      </div>

      <div
        onKeyDown={handleKeyDown}
        className="p-4 shadow-xl rounded-xl bg-white flex gap-4 fixed w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-1/2 top-[90vh]"
      >
        <input
          placeholder="Enter your query please"
          value={query}
          disabled={triggerSearch}
          className=" focus:outline-none placeholder:font-bold w-full"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button disabled={triggerSearch} onClick={onSub}>
          <img className="w-[33px] h-[33px]transition-all" src="./search.svg" />
        </button>
      </div>
    </>
  );
};

export default QueryResolver;
