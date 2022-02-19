/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks collection
 */
import mongoose from "mongoose";
import bookmarkSchema from "./BookmarkSchema";

const bookmarksModel = mongoose.model('bookmarkModel',bookmarkSchema);

export default bookmarksModel;