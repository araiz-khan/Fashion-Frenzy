import mongoose, { Schema, type Model } from "mongoose";
import { connectToUsersDb } from "../connection";

export type UserRole = "buyer" | "seller";

export interface UserDocument {
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["buyer", "seller"], required: true },
  },
  { timestamps: true }
);

export async function getUserModel(): Promise<Model<UserDocument>> {
  const conn = await connectToUsersDb();
  return conn.models.User || conn.model<UserDocument>("User", UserSchema);
}
