import mongoose, { Schema } from "mongoose";
import TuitModel from "./TuitModel";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String,required: true},
    postedOn: {type: Date, default: Date.now},
    createdBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
},{collection: 'tuits'});

export default TuitSchema;