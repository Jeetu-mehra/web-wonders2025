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
      image,
      isFeatured
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

export async function PUT(request) {
  try {
    await connectionToDatabase();
    const { id, title, description, tags, category, image, isFeatured } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updatedContent = await Content.findByIdAndUpdate(
      id,
      { title, description, tags, category, image, isFeatured },
      { new: true }
    );

    if (!updatedContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(updatedContent, { status: 200 });
  } catch (err) {
    console.error("Error updating content:", err);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectionToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await Content.findByIdAndDelete(id);
    return NextResponse.json({ message: "Content deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting content:", err);
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}