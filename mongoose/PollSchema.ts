/**
 * @file Implements mongoose schema for polls.
 */
import mongoose, { Schema } from "mongoose";
import Poll from "../models/Poll";

/**
 * @typedef PollSchema Represents the polls done by a user.
 * @property {string} pollQuestion The poll done by the user.
 * @property {string[]} pollOptions The poll options provided by the user.
 * @property {Date} postedOn Time when the user polled.
 * @property {User} createdBy The user who created the poll.
 * @property {closed} closed The poll os open or closed.
 */
const PollSchema = new mongoose.Schema<Poll>({
    pollQuestion: {type: String,required: true},
    pollOptions: {type:[String], required:true},
    postedOn: {type: Date, default: Date.now},
    createdBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    closed: {type: Boolean, required: true}

},{collection: 'polls'});

export default PollSchema;