/**
 * @file Implements mongoose schema for dislikes.
 */
import {Dislike} from "../models/Dislikes";
import mongoose from "mongoose";

/**
 * @typedef Dislikes Represents the dislikes to a tuit done by a user.
 * @property {Tuit} tuit The tuit which is disliked.
 * @property {User} dislikedBy The user who disliked the tuit.
 */
const dislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TuitModel",
    },
    dislikedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
    },
},{collection:"dislikes"});

export default dislikeSchema