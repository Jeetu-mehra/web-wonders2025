import mongoose from "mongoose";

//defining schema
const contentSchema = new mongoose.Schema({
    title: String,
    description: String,
    tags: String,
    imageURL: {type: String, default: "nothing", required:false},
    featurContent: { type: Boolean, default: false },
    category: String
})

//make model out of the schema
const Content = mongoose.model("Content", contentSchema);

//export the model
export default Content;