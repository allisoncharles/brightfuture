import mongoose from "mongoose";

const FaceSchema = new mongoose.Schema(
  {
    faceTitle: { type: String, required: true },
    faceImg: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Face || mongoose.model("Face", FaceSchema);
