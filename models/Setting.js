import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
  {
    session: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Setting ||
  mongoose.model("Setting", SettingSchema);
