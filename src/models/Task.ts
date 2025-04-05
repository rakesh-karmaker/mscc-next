import mongoose, { Schema, Document, Model } from "mongoose";

// --- Define the interface for a submission ---
export interface ISubmission {
  username?: string;
  answer?: string;
  poster?: string | null;
  posterId?: string | null;
  submissionDate?: Date;
}

// --- Define the interface for a task document ---
export interface ITask extends Document {
  name: string;
  slug: string;
  summary: string;
  instructions: string;
  deadline: Date;
  first?: string | null;
  second?: string | null;
  third?: string | null;
  imageRequired: boolean;
  category: "article writing" | "poster design";
  submissions: ISubmission[];
  createdAt?: Date;
  updatedAt?: Date;
}

// --- Define the submission schema ---
const SubmissionSchema: Schema<ISubmission> = new Schema({
  username: { type: String },
  answer: { type: String },
  poster: { type: String, default: null },
  posterId: { type: String, default: null },
  submissionDate: { type: Date, default: () => new Date() },
});

// --- Define the task schema ---
const TaskSchema: Schema<ITask> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    summary: { type: String, required: true },
    instructions: { type: String, required: true },
    deadline: { type: Date, required: true },
    first: { type: String, default: null },
    second: { type: String, default: null },
    third: { type: String, default: null },
    imageRequired: { type: Boolean, default: false },
    category: {
      type: String,
      enum: ["article writing", "poster design"],
      required: true,
    },
    submissions: {
      type: [SubmissionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// --- Export the model ---
const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;
