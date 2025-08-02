import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isLoggedIn: { type: Boolean, default: false } // added field
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;