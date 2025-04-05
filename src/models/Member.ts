import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Define the interface for Member
export interface IMember extends Document {
  name: string;
  slug: string;
  email: string;
  contactNumber: string;
  password: string;
  batch: string;
  branch: string;
  image: string;
  imgId: string;
  reason: string;
  socialLink: string;
  timeline: Array<{
    taskId: mongoose.Types.ObjectId | null;
    tag: string;
    date: string;
    title: string;
    description: string;
    link: string;
  }>;
  submissions: Array<{ taskId: mongoose.Types.ObjectId }>;
  reference: string;
  role: string;
  position: string;
  new: boolean;
}

// Define the schema for submissions
const SubmissionSchema: Schema = new Schema({
  taskId: { type: Schema.Types.ObjectId, ref: "Task" },
});

// Define the schema for members
const MemberSchema: Schema<IMember> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    contactNumber: { type: String, required: true },
    password: { type: String, required: true },
    batch: { type: String, required: true },
    branch: { type: String, required: true },
    image: { type: String, required: true },
    imgId: { type: String, required: true },
    reason: { type: String, required: true },
    socialLink: { type: String, required: true },
    timeline: {
      type: [
        {
          taskId: {
            type: Schema.Types.ObjectId,
            ref: "Task",
            default: null,
          },
          tag: { type: String },
          date: { type: String },
          title: { type: String },
          description: { type: String },
          link: { type: String, default: "#" },
        },
      ],
    },
    submissions: [SubmissionSchema],
    reference: { type: String, required: true },
    role: { type: String, default: "member" },
    position: { type: String, default: "member" },
    new: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Pre-save hook for hashing the password
MemberSchema.pre<IMember>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Export the model
const Member: Model<IMember> =
  mongoose.models.Member || mongoose.model<IMember>("Member", MemberSchema);

export default Member;
