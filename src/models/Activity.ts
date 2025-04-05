import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for an Activity
export interface IActivity extends Document {
  tag: string;
  date: string;
  slug: string;
  coverImageUrl: string;
  coverImageId: string;
  title: string;
  summary: string;
  gallery: Array<{
    url: string;
    imgId: string;
  }>;
  content: string;
}

// Define the Activity schema
const ActivitySchema: Schema<IActivity> = new Schema(
  {
    tag: { type: String, required: true },
    date: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    coverImageUrl: { type: String, required: true },
    coverImageId: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    gallery: {
      type: [
        {
          url: { type: String, required: true },
          imgId: { type: String, required: true },
        },
      ],
      default: [],
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Export the model
const Activity: Model<IActivity> =
  mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", ActivitySchema);

export default Activity;
