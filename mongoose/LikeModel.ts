/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
import mongoose from "mongoose";
import likeSchema from "./LikeSchema";

const LikeModel = mongoose.model('LikeModel',likeSchema);

export default LikeModel;