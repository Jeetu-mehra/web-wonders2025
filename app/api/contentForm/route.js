import connectionToDatabase from "@/lib/dbConnect";
import Content from "@/Schemas/Content";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectionToDatabase();

        const { title, description, tags, category, image, isFeatured } = await request.json();

        const newContent = await Content.create({
            title,
            description,
            tags,
            category,
            image,          //  Save Cloudinary URL
            isFeatured      //  Save featured status
        });

        return NextResponse.json(newContent, { status: 201 });
    } catch (err) {
        console.error("Error creating content:", err);
        return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectionToDatabase();
        const allContent = await Content.find().sort({ createdAt: -1 });
        return NextResponse.json(allContent, { status: 200 });
    } catch (err) {
        console.error("Error fetching content:", err);
        return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
    }
}
