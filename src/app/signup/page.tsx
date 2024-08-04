"use client";
import { FC } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

//using yup to create a validated schema
const schema = yup.object().shape({
  fName: yup.string().required("First name is required"),
  lName: yup.string().required("Second name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export interface FormData {
  fName: string;
  lName: string;
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
    setOpen(true);
    const formData = new FormData();
    formData.append("fName", data.fName);
    formData.append("lName", data.lName);
    formData.append("email", data.email);
    formData.append("password", data.password);

    axios
      .post(
        "https://gen-slug-generative-nqkzavotf.vercel.app/api/signup",
        formData
      )
      .then((response) => {
        console.log(response);
        toast.success("Submitted Succesfully");
        setOpen(false);
        router.push("/");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.msg === "USER_ALREADY_PRESNT"
        ) {
          toast.error("User Already Present");
        } else {
          console.error(error);
          toast.error("Some Error Occurred");
        }
        setOpen(false);
      });
  }

  return (
    <div className="relative flex items-center justify-center pl-[3vw] pr-[3vw]">
      <Toaster />
      <form
        className="bg-white shadow-lg rounded-xl flex flex-col gap-5 p-5 lg:p-9 mt-[6vh] lg:w-1/2 w-[90%] md:w-1/2 sm:w-1/2 transition-all"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-4 items-center">
          <h1 className="font-bold text-[20px] mt-1 mb-3">Sign Up</h1>
        </div>

        {/* intro */}
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold ml-1">First Name</label>
            <input
              className="focus:outline-none border rounded-xl focus:border p-2 w-full placeholder:truncate"
              placeholder="Enter Your First Name"
              {...register("fName")}
            />
            {errors.fName && (
              <p className="text-red-600 ml-1">{errors.fName.message}</p>
            )}
          </div>

          <div className="flex flex-col w-full gap-2">
            <label className="font-bold ml-1">Last Name</label>
            <input
              className="focus:outline-none border rounded-xl focus:border p-2 w-full placeholder:truncate"
              placeholder="Enter Your Last Name"
              {...register("lName")}
            />
            {errors.lName && (
              <p className="text-red-600 ml-1">{errors.lName.message}</p>
            )}
          </div>
        </div>

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
            <p className="text-red-600 ml-1">{errors.email.message}</p>
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
            <Link href={"/login"}>
              {" "}
              <button className="p-3 flex justify-center items-center gap-3 pl-[3vw] w-full rounded border-dashed text-white bg-blue-500 hover:border hover:border-white hover:bg-blue-600 transition-all pr-[3.5vw]">
                Login Your Account
                <img className="w-[20px] h-[20px]" src="./login.svg" />
              </button>
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default page;
