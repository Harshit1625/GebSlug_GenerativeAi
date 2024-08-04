"use client";
import { FC } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

//using yup to create a validated schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface FormData {
  email: string;
  password: string;
}
interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: FormData) {
    console.log(data);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    console.log(formData);
    setOpen(true);

    axios
      .post(
        "https://gen-slug-generative-ai.vercel.app/api/e-ai.vercel.app/api/login",
        formData
      )
      .then((res) => {
        toast.success("Logged in");
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
        if (e.response && e.response.data.msg === "USER_NOT_FOUND") {
          toast.error("User Not Found");
        }
        if (e.response && e.response.data.msg === "PASSWORD_NOT_MATCHING") {
          toast.error("Wrong Password");
        }
        setOpen(false);
      });
  }

  return (
    <>
      <Toaster />
      <div className="relative flex items-center justify-center pl-[3vw] pr-[3vw]">
        <form
          className="bg-white shadow-lg rounded-xl flex flex-col gap-5 p-5 lg:p-9 mt-[10vh] lg:w-1/ w-[90%] md:w-1/2 sm:w-1/2 transition-all"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4 items-center">
            <h1 className="font-bold text-[20px] mt-1 mb-3">Log In</h1>
            {/* <Image width={25} height={25} src={""} /> */}
          </div>

          {/* intro */}

          <div className="flex flex-col gap-2">
            <label className="font-bold ml-1">Enter Email</label>
            <input
              className="focus:outline-none border rounded-xl focus:border p-2 placeholder:truncate"
              placeholder="Enter Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-600 ml-1">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold ml-1">Enter Password</label>
            <input
              className="focus:outline-none border rounded-xl focus:border p-2"
              placeholder="Enter Your Password"
              {...register("password")}
            />
            {errors.email && (
              <p className="text-red-600 ml-1">{errors.password?.message}</p>
            )}
          </div>

          <div className="flex p-3">
            <div className="w-full items-end justify-center flex">
              <button
                className={
                  open
                    ? "p-3 pl-[3vw] w-full rounded border-dashed bg-gray-500 text-white pr-[3.5vw]"
                    : "p-3 pl-[3vw] w-full rounded border-dashed text-white bg-black hover:border hover:border-black hover:bg-white hover:text-black transition-all pr-[3.5vw]"
                }
                type="submit"
                disabled={open}
              >
                {open ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>

          <div className="flex items-center  justify-center gap-5 p-3 pt-0">
            <h1 className="font-bold text-black ">OR</h1>
            <span>
              <Link href={"/signup"}>
                {" "}
                <button className="p-3 flex justify-center items-center gap-3 pl-[3vw] w-full rounded border-dashed text-white bg-blue-500 hover:border hover:border-white hover:bg-blue-600 transition-all pr-[3.5vw]">
                  Create New Account
                  <img className="w-[20px] h-[20px]" src="./signup.svg" />
                </button>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
