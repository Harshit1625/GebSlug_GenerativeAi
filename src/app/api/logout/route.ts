import { NextResponse } from "next/server";

export function GET() {
  try {
    const response = NextResponse.json({ msg: "Logged out successfully" });
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json({ msg: "Some Error Occurred" });
  }
}
