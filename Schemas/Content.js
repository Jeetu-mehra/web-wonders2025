import mongoose from "mongoose";

//schema
const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  category: { type: String, required: true },
  image: { type: String, required: true }, //  Cloudinary URL
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);