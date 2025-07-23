import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: String,
    imageURL: {type: String, default: "nothing", required:false},
    featurContent: { type: Boolean, default: false },
    category: String
})

const Content = mongoose.model("Content", contentSchema);
export default Content