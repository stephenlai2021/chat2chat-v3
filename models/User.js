import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    chats: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
      default: [],
    },
  }
);

const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User