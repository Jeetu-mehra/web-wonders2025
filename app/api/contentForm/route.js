import connectionToDatabase from "@/lib/dbConnect";
import Content from "@/Schemas/Content";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await connectionToDatabase();
    const { title, description, tags, category, image, isFeatured } = await request.json();

    if (!title || !description || !category || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newContent = await Content.create({
      title,
      description,
      tags,
      category,
      image,
      isFeatured: !!isFeatured
    });

    console.log('Created new content:', newContent);
    return NextResponse.json(newContent, { status: 201 });
  } catch (err) {
    console.error("Error creating content:", err);
    return NextResponse.json({ error: "Failed to create content", details: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectionToDatabase();
    const allContent = await Content.find().sort({ createdAt: -1 });
    console.log('Fetched content:', allContent);
    return NextResponse.json(allContent, { status: 200 });
  } catch (err) {
    console.error("Error fetching content:", err);
    return NextResponse.json({ error: "Failed to fetch content", details: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectionToDatabase();
    const { _id, title, description, tags, category, image, isFeatured } = await request.json();

    if (!_id || !mongoose.isValidObjectId(_id)) {
      return NextResponse.json({ error: "Valid _id is required" }, { status: 400 });
    }

    if (!title || !description || !category || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedContent = await Content.findByIdAndUpdate(
      _id,
      { title, description, tags, category, image, isFeatured: !!isFeatured },
      { new: true, runValidators: true }
    );

    if (!updatedContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    console.log('Updated content:', updatedContent);
    return NextResponse.json(updatedContent, { status: 200 });
  } catch (err) {
    console.error("Error updating content:", err);
    return NextResponse.json({ error: "Failed to update content", details: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectionToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Valid _id is required" }, { status: 400 });
    }

    const deletedContent = await Content.findByIdAndDelete(id);
    if (!deletedContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    console.log('Deleted content with _id:', id);
    return NextResponse.json({ message: "Content deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting content:", err);
    return NextResponse.json({ error: "Failed to delete content", details: err.message }, { status: 500 });
  }
}