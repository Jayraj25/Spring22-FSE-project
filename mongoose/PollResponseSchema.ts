/**
 * @file Implements mongoose schema for polls.
 */
import mongoose, { Schema } from "mongoose";
import PollResponse from "../models/PollResponse";


/**
 * @typedef PollResponseSchema Represents the responses to polls done by a user.
 * @property {Poll} pollId The poll ID of the poll for which response is recorded.
 * @property {User} respondedBy The user who responded to the poll.
 * @property {Number} chosenOption The poll option selected by responder.
 */
const PollResponseSchema = new mongoose.Schema<PollResponse>({
    pollId: {type: Schema.Types.ObjectId, ref: "PollModel"},
    respondedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    chosenOption: {type: Number, required: true}
},{collection: 'pollResponses'});

export default PollResponseSchema;