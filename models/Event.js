import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    eventTitle: { type: String, required: true },
    eventHost: { type: String, required: true },
    eventDate: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
