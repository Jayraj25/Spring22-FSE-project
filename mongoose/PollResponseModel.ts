/**
 * @file Implements mongoose model to CRUD documents in the poll responses collection
 */
import mongoose from "mongoose";
import PollResponseSchema from "./PollResponseSchema";

const PollResponseModel = mongoose.model('PollResponseModel',PollResponseSchema);

export default PollResponseModel;