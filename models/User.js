import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    regno: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String },
    class: { type: String, required: true },
    arm: { type: String, required: true },
    passcode: { type: String, required: true },
    profileImg: { type: String, default: "" },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

// UserSchema.set("strictQuery", true);

export default mongoose.models.User || mongoose.model("User", UserSchema);
