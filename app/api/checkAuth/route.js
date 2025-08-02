import connectionToDatabase from "@/lib/dbConnect";
import User from "@/Schemas/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectionToDatabase();
  const { id } = await request.json();

  const user = await User.findOne({ id });   // Must match what you stored

  if (user && user.isLoggedIn) {
    return NextResponse.json({ isAuthenticated: true });
  }

  return NextResponse.json({ isAuthenticated: false });
}