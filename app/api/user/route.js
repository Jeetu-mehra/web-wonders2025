import connectionToDatabase from "@/lib/dbConnect";
import User from "@/Schemas/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectionToDatabase();
        const { id, password } = await request.json();
        await User.create({
            id: id,
            password: password
        })
        return NextResponse.json({ message: "Content created" })
    } catch (err) {
        console.log(err);
    }
}

export async function GET (){
    await connectionToDatabase();
    const allUser = await User.find();
    return NextResponse.json({allUser});
}