import mongoose from "mongoose";
import bookmarkSchema from "./BookmarkSchema";

const bookmarksModel = mongoose.model('bookmarkModel',bookmarkSchema);

export default bookmarksModel;