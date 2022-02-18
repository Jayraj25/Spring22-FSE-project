import mongoose from "mongoose";
import followSchema from "./FollowSchema";

const followModel = mongoose.model('followModel',followSchema);

export default followModel;
