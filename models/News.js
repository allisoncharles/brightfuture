import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    newsTitle: { type: String, required: true },
    newsImg: { type: String, required: true },
  },
  { timestamps: true }
);

// NewsSchema.set("strictQuery", true);

export default mongoose.models.News || mongoose.model("News", NewsSchema);
