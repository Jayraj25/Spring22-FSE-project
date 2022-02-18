import mongoose from "mongoose";
import messageSchema from "./MessageSchema";

const messageModel = mongoose.model('messageModel',messageSchema);

export default messageModel;