/**
 * @file Implements mongoose schema for messages.
 */
import mongoose,{ Schema } from "mongoose";
import Message from "../models/Message";

/**
 * @typedef Message represents the text message done by a user.
 * @property {string} messageText the message body.
 * @property {User} to the message sender.
 * @property {User} from the message recepient.
 * @property {Date} sentOn the Date time when message was sent.
 */
const messageSchema = new mongoose.Schema<Message>({
    messageText: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
},{collection:'messages'});

export default messageSchema;