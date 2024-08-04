"use client";
import { FC, useState, useEffect, useRef } from "react";
import QueryResolver from "../components/QueryResolver";
import ImageGenerator from "../components/ImageGenerator";
import axios from "axios";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";

interface pageProps {}
export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

// #152C70
// #4296FFp

const page: FC<pageProps> = ({}) => {
  const [switchOpener, setSwitchOpener] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [changeAi, setChangeAi] = useState<boolean>(false); //false for generative text , true for genrative true
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loader, setLoader] = useState<boolean>(true);
  const dataContainerRef = useRef();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://gen-slug-generative-nqkzavotf.vercel.app/api/profile")
      .then((res) => {
        setUser({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
        });
        setLoader(false);
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          router.push("/login");
        }
        console.log(e);
      });
  }, []);

  async function logOut() {
    axios.get("https://gen-slug-generative-nqkzavotf.vercel.app/api/logout");
    router.push("/login");
  }

  console.log(user);
  return (
    <>
      <div className="parent">
        {loader && <Loader />}
        {!loader && (
          <div className="flex relative">
            {/* Sidebar for sm */}
            <div
              onClick={() => setOpenSidebar(!openSidebar)}
              className=" flex absolute left-[87vw] top-5 z-10 sm:left-[93%] shadow-lg lg:hidden md:hidden p-2 rounded-2xl bg-white"
            >
              <img
                className={`w-[23px] h-[23px] mb-1 transition-all visibility-animation ${
                  openSidebar ? "rotate-180" : ""
                }`}
                src={openSidebar ? "./switchCloser.svg" : "./rightArrow.svg"}
              />
            </div>
            {openSidebar && (
              <div className="absolute shadow-lg rounded-r-2xl left-slide z-10 lg:hidden md:hidden w-[70%] border-r-2 flex-col bg-white h-[90vh] gap-3">
                {/* Switch */}

                {/* Switch Wrapper */}
                <div className="flex flex-col">
                  <div
                    onClick={() => setSwitchOpener(!switchOpener)}
                    className="flex items-center justify-between pr-4 border-b-2"
                  >
                    <div className="flex p-5 pl-[2vw] items-center gap-3">
                      <h1 className="font-bold text-[15px]">AI Switch</h1>
                      <img
                        className="w-[20px] h-[20px] mb-1"
                        src="./AISwitchIcon.svg"
                      />
                    </div>
                    {switchOpener ? (
                      <img
                        className="w-[20px] h-[20px] transition-all"
                        src="./switchCloser.svg"
                      />
                    ) : (
                      <img
                        className="w-[20px] h-[20px] transition-all"
                        src="./dropdown.svg"
                      />
                    )}
                  </div>

                  {/* options */}
                  {switchOpener && (
                    <div className="border mt-4 shadow-md flex flex-col w-[93%] ml-2 sm:ml- rounded-lg cursor-pointer">
                      <div
                        onClick={() => {
                          setChange(true);
                          setSwitchOpener(!switchOpener);
                          setOpenSidebar(!openSidebar);
                          setChangeAi(true);
                        }}
                        className={`items-center flex gap-2 font-bold p-4 border pl-[2vw] sm:pl-[3vw] visibility-animation ${
                          change === true
                            ? "border-blue-400 border border-rounded-lg border-dotted border-rounded-sm"
                            : ""
                        }`}
                      >
                        <img
                          className="w-[20px] h-[20px] transition-all"
                          src="./generativeImg.svg"
                        />
                        <h1 className="gradient-text sm:text-[15px]">
                          Generate Image
                        </h1>
                      </div>

                      <div
                        onClick={() => {
                          setChange(false);
                          setSwitchOpener(!switchOpener);
                          setOpenSidebar(!openSidebar);
                          setChangeAi(false);
                        }}
                        className={`items-center flex gap-2 font-bold p-4 border pl-[3vw] visibility-animation ${
                          change === false
                            ? "border-blue-400 border-dotted border-rounded-lg"
                            : ""
                        }`}
                      >
                        <img
                          className="w-[20px] h-[20px] transition-all"
                          src="./generativeText.svg"
                        />
                        <h1 className="gradient-text sm:text-[15px]">
                          {" "}
                          Generate Text
                        </h1>
                      </div>
                    </div>
                  )}
                </div>

                {/*  Signout*/}

                <div className="border flex items-center cursor-pointer pt-2 pb-2">
                  <img
                    className="w-[27px] h-[27px] sm:w-[33px] sm:h-[33px] transition-all ml-2 sm:ml-4 mr-4"
                    src="./user.svg"
                  />
                  <div className="flex flex-col p-4 pb-2 pt-2 w-[70%]">
                    <h1 className="font-bold text-[3.5vw] sm:text-[3vw]">
                      {user.firstName} {user.lastName}
                    </h1>
                    <h1 className="font-semibold text-[3.1vw] sm:text-[2.5vw] text-gray-500">
                      {user.email}
                    </h1>
                  </div>
                  <button onClick={logOut}>
                    <img
                      className="w-[7vw] h-[7vh] sm:w-[33px] sm:h-[33px] transition-all mr-4 sm:ml-5"
                      src="./signout.svg"
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Sidebar for md,lg*/}
            <div className="hidden lg:flex md:flex w-1/3 border-r-2 flex-col bg-white h-[93vh] gap-3 resize-x">
              {/* Switch */}

              {/* Switch Wrapper */}
              <div className="flex flex-col">
                <div
                  onClick={() => setSwitchOpener(!switchOpener)}
                  className="flex items-center justify-between pr-4 border-b-2"
                >
                  <div className="flex p-5 pl-[2vw] items-center gap-3">
                    <h1 className="font-bold text-[15px]">AI Switch</h1>
                    <img
                      className="w-[20px] h-[20px]"
                      src="./AISwitchIcon.svg"
                    />
                  </div>
                  {switchOpener ? (
                    <img
                      className="w-[20px] h-[20px] transition-all"
                      src="./switchCloser.svg"
                    />
                  ) : (
                    <img
                      className="w-[20px] h-[20px] transition-all"
                      src="./dropdown.svg"
                    />
                  )}
                </div>

                {/* options */}
                {switchOpener && (
                  <div className="border mt-4 shadow-md flex flex-col w-[93%] lg:ml-5 md:ml-2 rounded-lg cursor-pointer">
                    <div
                      onClick={() => {
                        setChange(true);
                        setSwitchOpener(!switchOpener);
                        setChangeAi(true);
                      }}
                      className={`items-center flex gap-2 font-bold p-4 border pl-[3vw] visibility-animation ${
                        change === true
                          ? "border-blue-400 border border-rounded-lg border-dotted border-rounded-sm"
                          : ""
                      }`}
                    >
                      <img
                        className="w-[20px] h-[20px] transition-all"
                        src="./generativeImg.svg"
                      />
                      <h1 className="gradient-text">Generate Image</h1>
                    </div>

                    <div
                      onClick={() => {
                        setChange(false);
                        setSwitchOpener(!switchOpener);
                        setChangeAi(false);
                      }}
                      className={`items-center flex gap-2 font-bold p-4 border pl-[3vw] visibility-animation ${
                        change === false
                          ? "border-blue-400 border-dotted border-rounded-lg"
                          : ""
                      }`}
                    >
                      <img
                        className="w-[20px] h-[20px] transition-all"
                        src="./generativeText.svg"
                      />
                      <h1 className="gradient-text">Generate Text</h1>
                    </div>
                  </div>
                )}
              </div>

              {/*  Signout*/}

              <div className="border flex items-center cursor-pointer">
                <img
                  className="w-[27px] h-[27px] transition-all ml-4 mr-4 md:mr-1"
                  src="./user.svg"
                />
                <div className="flex flex-col  p-4 pb-2 pt-2 w-[70%]">
                  <h1 className="font-bold text-[1.2vw]">
                    {user.firstName} {user.lastName}
                  </h1>
                  <h1 className="font-semibold text-[1vw] text-gray-500">
                    {user.email}
                  </h1>
                </div>
                <button onClick={logOut}>
                  <img
                    className="w-[25px] h-[25px] transition-all lg:ml-4 lg:mr-4 md:ml-1 md:mr-5"
                    src="./signout.svg"
                  />
                </button>
              </div>
            </div>

            {/* main */}
            <div className="p-8 pb-0 flex justify-center w-full overflow-y-auto h-[80vh] border-b-2 border-gray-500 border-dotted">
              {changeAi ? (
                <ImageGenerator user={user} />
              ) : (
                <QueryResolver user={user} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
