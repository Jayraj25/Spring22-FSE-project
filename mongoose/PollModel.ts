/**
 * @file Implements mongoose model to CRUD documents in the polls collection
 */
import mongoose from "mongoose";
import PollSchema from "./PollSchema";

const PollModel = mongoose.model('PollModel',PollSchema);

export default PollModel;