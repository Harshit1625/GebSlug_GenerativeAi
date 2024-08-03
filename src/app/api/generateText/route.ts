
import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";

dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const createModel = () => {
  const key  = process.env.API_KEY ?? '';
  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

const model = createModel();
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {query } = await req.json()
    console.log(query)
    const result = await model.generateContent(query);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
}
