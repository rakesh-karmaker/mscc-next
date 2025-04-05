import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for a Message document
export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  new: boolean;
}

// Define the Message schema
const MessageSchema: Schema<IMessage> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    new: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Export the model
const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
