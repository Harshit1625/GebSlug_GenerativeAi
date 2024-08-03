import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@/db/UserModel";
import mongoose, { MongooseError } from "mongoose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface IUser {
  email: string;
  _id: mongoose.Types.ObjectId;
}
export async function GET(req: Request, res: Response) {
  const jwtSecret = "jsonwebstring";
  try {
    const token: RequestCookie | undefined = cookies().get("token");
    console.log(token);

    if (!token) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    //Response should be like this
    // {
    //   name: 'token',
    //   value:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkhhcnNoaXRzcmkxNjJAZ21haWwuY29tIiwiaWQiOiI2NmFhNjYxODNkZjlmMzRjMzk2MmM5NGYiLCJpYXQiOjE3MjI0NDMyOTB9.7J8VVBOjG1ENhiW-UxsEkCnsDUxwirWRYD6IWpIcLjU',
    //   path: '/'
    // }

    const tokenValue: string | undefined = token.value;
    if (tokenValue) {
      const decoded: JwtPayload | string = jwt.verify(tokenValue, jwtSecret);

      if (typeof decoded === "object" && decoded !== null) {
        const resp = await User.findOne({ email: decoded.email });
        console.log(resp);
        return NextResponse.json(resp);
      } else {
        console.error("Invalid token format");
        // Handle invalid token (e.g., return error response)
      }
    }
    return NextResponse.json({ msg: "ok" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "lol" });
  }
}
