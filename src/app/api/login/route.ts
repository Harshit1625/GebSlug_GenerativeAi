import { connectDb } from "@/db/dbConnection";
import User from "@/db/UserModel";
import { NextResponse } from "next/server";
import { formDataToJSON } from "../../../util/formDataToJSON";
import { IData } from "../../../util/formDataToJSON";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request, res: Response) {
  try {
    await connectDb();
    const formData = await req.formData();
    console.log(formData);
    const data: IData = formDataToJSON(formData);
    const jwtSecret = "jsonwebstring";

    console.log(data);
    const { email, password }: IData = data;
    const stringPassword = password.toString(); // Convert password to string
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return NextResponse.json({ msg: "USER_NOT_FOUND" }, { status: 404 });
    }

    //comparing passwords
    const passOk = bcrypt.compareSync(stringPassword, userDoc.password);
    if (!passOk) {
      return NextResponse.json(
        { msg: "PASSWORD_NOT_MATCHING" },
        { status: 404 }
      );
    }

    const token = await jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      jwtSecret
    );

    const response = NextResponse.json({ msg: " Success" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return response;
  } catch (error) {
    return NextResponse.json({ msg: "error occurred" }, { status: 404 });
  }
}
