import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: String,
    imageURL: String,
    featurContent: Boolean,
    category: String
})

const Content = mongoose.model("Content", contentSchema);
export default Content