import connectionToDatabase from "@/lib/dbConnect";
import Content from "@/Schemas/Content";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectionToDatabase();
        const { title, description, tags, imageURL, category, featureContent } = await request.json();
        await Content.create({
            title: title,
            description: description,
            tags: tags,
            category: category,
            featurContent: featureContent,
            imageURL:imageURL
        })
        return NextResponse.json({message:"Content created"})
    }
    catch (err) {
        console.log(err);
    }
}

export async function GET (){
    await connectionToDatabase();
    const allContent = await Content.find();
    return NextResponse.json({allContent});
}