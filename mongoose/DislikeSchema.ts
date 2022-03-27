// create a dislike schema
import {Dislike} from "../models/Dislikes";
import mongoose from "mongoose";

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