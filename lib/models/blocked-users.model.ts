/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

const blockedUsersSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  blockedUserId: {
    type: String,
    required: true,
  },
});

const BlockedUsers =
  mongoose.models.BlockedUsers ||
  mongoose.model("BlockedUsers", blockedUsersSchema);

export default BlockedUsers;
