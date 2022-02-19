/**
 * @file Implements mongoose schema for tuits.
 */
import mongoose, { Schema } from "mongoose";
import Tuit from "../models/Tuit";

/**
 * @typedef Tuit Represents the tuit done by a user.
 * @property {string} tuit The tuit done by the user.
 * @property {Date} postedOn Time when the user tuited.
 * @property {User} createdBy The user who created the tuit.
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String,required: true},
    postedOn: {type: Date, default: Date.now},
    createdBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
},{collection: 'tuits'});

export default TuitSchema;