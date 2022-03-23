/**
 * @file Implements mongoose schema for bookmarks.
 */
import mongoose, {Schema} from "mongoose";
import Bookmarks from "../models/Bookmarks";

/**
 * @typedef Bookmarks Represents the tuits which are bookmarked by a user.
 * @property {Tuit} bookmarkedTuit The tuit which is bookmarked.
 * @property {User} bookmarkedBy The user who bookmarked the tuit.
 */
const bookmarkSchema = new mongoose.Schema<Bookmarks>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
},{collection: "bookmarks"});

export default bookmarkSchema;