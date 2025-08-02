import connectionToDatabase from "@/lib/dbConnect";
import User from "@/Schemas/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectionToDatabase();
    const { id, password } = await request.json();

    console.log("Login API received:", id, password);

    const user = await User.findOne({ id });
    console.log("Found user:", user);

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    await User.findOneAndUpdate({ id }, { isLoggedIn: true });

    return NextResponse.json({ success: true, user });  // Return full user object
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}