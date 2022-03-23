/**
 * @file Implements mongoose schema for follow.
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 * @typedef Follow Represents the follower and following on the tuiter app.
 * @property {User} userFollower The user who requested to follow another user.
 * @property {User} userFollowing The user who recieves to follow request from another user.
 */
const followSchema = new mongoose.Schema<Follow>({
    userFollower: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
},{collection: 'follow'});

export default followSchema;
