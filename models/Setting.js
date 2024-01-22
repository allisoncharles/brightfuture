import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
  {
    session: { type: String, required: true },
  },
  { timestamps: true }
);

// SettingSchema.set("strictQuery", true);

export default mongoose.models.Setting ||
  mongoose.model("Setting", SettingSchema);
