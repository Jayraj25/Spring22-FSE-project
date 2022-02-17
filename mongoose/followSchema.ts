import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";
import UserModel from "./UserModel";

const followSchema = new mongoose.Schema<Follow>({
    userFollower: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
},{collection: 'follow'});

export default followSchema;