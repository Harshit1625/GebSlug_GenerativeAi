"use server";

import dotenv from "dotenv";
import mongoose, { Mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { FormData } from "@/app/signup/page";
import { NextResponse } from "next/server";
import User from "../../../db/UserModel";
import { connectDb } from "@/db/dbConnection";
import { formDataToJSON } from "@/util/formDataToJSON";
import { IData } from "@/util/formDataToJSON";

const salt = bcrypt.genSaltSync(10);

interface MyFormData {
  _id: mongoose.Types.ObjectId;
  fName: string;
  lName: string;
  email: string;
  password: string;
}



export async function POST(req: Request, res: Response) {
  try {
    await connectDb();

    const formData = await req.formData();
    const data: IData = formDataToJSON(formData);
    const jwtSecret = "jsonwebstring";

    const { fName, lName, email, password }: IData = data;
    const stringPassword = password.toString(); // Convert password to string

    const checkingUser = await User.findOne({ email });
    if (checkingUser) {
      return NextResponse.json({ msg: "USER_ALREADY_PRESNT" }, { status: 404 });
    } else {
      await User.create({
        firstName: fName,
        lastName: lName,
        email,
        password: bcrypt.hashSync(stringPassword, salt),
      });

      const user: MyFormData | null = await User.findOne({ email });
      if (user) {
        const token = await jwt.sign(
          { email: user.email, id: user._id },
          jwtSecret
        );
        const response = NextResponse.json(
          { msg: "user received" },
          { status: 200 }
        );
        response.cookies.set("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        return response;
      } else {
        // Handle user not found case (e.g., send appropriate error response)
        return NextResponse.json(
          { message: "User not registered" },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error occurred" }, { status: 500 });
  }
}

