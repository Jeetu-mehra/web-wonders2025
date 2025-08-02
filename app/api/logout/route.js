import connectionToDatabase from "@/lib/dbConnect";
import User from "@/Schemas/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectionToDatabase();
    const { id } = await request.json();

    await User.findOneAndUpdate({ id }, { isLoggedIn: false }); // mark logged out
    return NextResponse.json({ message: "Logged out" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}