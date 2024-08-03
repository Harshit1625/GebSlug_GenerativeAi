import mongoose, { Document, Schema } from "mongoose";

// Define an interface representing a document in MongoDB
interface IUser extends Document {
  fName: string;
  lName: string;
  email: string;
  password: string;
}

// Defining the schema
const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create the User model from the schema
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
