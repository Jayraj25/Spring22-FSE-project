import mongoose,{ Schema } from "mongoose";
import Message from "../models/Message";

const messageSchema = new mongoose.Schema<Message>({
    messageText: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
},{collection:'messages'});

export default messageSchema;