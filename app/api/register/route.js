import connectionToDatabase from "@/lib/dbConnect";
import User from "@/Schemas/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectionToDatabase();
    const { id, password } = await request.json();

    if (!id || !password) {
      return NextResponse.json({ error: "ID and password are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return NextResponse.json({ error: "User ID already exists" }, { status: 409 });
    }

    // Create new user
    const newUser = await User.create({
      id,
      password, // In a production app, hash the password (e.g., using bcrypt)
      isLoggedIn: false
    });

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}