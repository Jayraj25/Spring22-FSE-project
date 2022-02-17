import mongoose from "mongoose";
import followSchema from "./followSchema";

const followModel = mongoose.model('followModel',followSchema);

export default followModel;