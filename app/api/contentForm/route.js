import connectionToDatabase from "@/lib/dbConnect";
import Content from "@/Schemas/Content";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectionToDatabase();
        const { title, description, tags, imageURL, category, featureContent } = await request.json();
    }
    catch (err) {
        console.log(err);
    }
}