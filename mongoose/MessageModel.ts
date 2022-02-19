/**
 * @file Implements mongoose model to CRUD
 * documents in the messages collection
 */
import mongoose from "mongoose";
import messageSchema from "./MessageSchema";

const messageModel = mongoose.model('messageModel',messageSchema);

export default messageModel;