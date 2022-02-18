import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

const followSchema = new mongoose.Schema<Follow>({
    userFollower: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
},{collection: 'follow'});

export default followSchema;
