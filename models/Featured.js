import mongoose from "mongoose";

const FeaturedSchema = new mongoose.Schema(
  {
    featuredImg: { type: String, required: true },
    featuredTitle: { type: String, required: true },
    featuredText: { type: String, required: true },
  },
  { timestamps: true }
);

// FeaturedSchema.set("strictQuery", true);

export default mongoose.models.Featured ||
  mongoose.model("Featured", FeaturedSchema);
