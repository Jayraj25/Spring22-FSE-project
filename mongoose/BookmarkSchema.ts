import mongoose, {Schema} from "mongoose";
import Bookmarks from "../models/Bookmarks";

const bookmarkSchema = new mongoose.Schema<Bookmarks>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
},{collection: "bookmarks"});

export default bookmarkSchema;