import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for ResetOtp
export interface IResetOtp extends Document {
  email: string;
  opt: string;
  token: string | null;
  createdAt: Date;
  expiresAt: Date;
}

// Define the ResetOtp schema
const OPTSchema: Schema<IResetOtp> = new Schema({
  email: { type: String, required: true, unique: true },
  opt: { type: String, required: true },
  token: { type: String, default: null },
  createdAt: { type: Date },
  expiresAt: { type: Date },
});

// Export the model
const ResetOtp: Model<IResetOtp> =
  mongoose.models.ResetOtp || mongoose.model<IResetOtp>("ResetOtp", OPTSchema);

export default ResetOtp;
