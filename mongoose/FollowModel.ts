/**
 * @file Implements mongoose model to CRUD
 * documents in the follow collection
 */
import mongoose from "mongoose";
import followSchema from "./FollowSchema";

const followModel = mongoose.model('followModel',followSchema);

export default followModel;
