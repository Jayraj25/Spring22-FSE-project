import mongoose from "mongoose";
import User from "../models/User";

const TuitSchema = new mongoose.Schema({
    tuit: String,
    postedOn: Date,
    createdBy: User
},{collection: 'tuits'});

export default TuitSchema;