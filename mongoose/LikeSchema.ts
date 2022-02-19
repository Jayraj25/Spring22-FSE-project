/**
 * @file Implements mongoose schema for likes.
 */
import mongoose, { Schema } from "mongoose";
import Likes from "../models/Likes";

/**
 * @typedef Likes Represents the likes to a tuit done by a user.
 * @property {Tuit} tuit The tuit which is liked.
 * @property {User} likedBy The user who liked the tuit.
 */
const likeSchema = new mongoose.Schema<Likes>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
},{collection: 'likes'});

export default likeSchema;