import mongoose, { Schema } from "mongoose";
import Likes from "../models/Likes";

const likeSchema = new mongoose.Schema<Likes>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
},{collection: 'likes'});

export default likeSchema;