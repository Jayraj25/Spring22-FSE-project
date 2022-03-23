/**
 * @file Declares DAO interface managing Data Storage Access for bookmarks.
 */
import Bookmarks from "../models/Bookmarks";

export default interface BookmarkDaoI {
    userBookmarksTuit (uid: String, tid: String): Promise<any>;
    userUnbookmarksTuit (uid: String, tid: String): Promise<any>;
    getBookmarksList (uid: String): Promise<Bookmarks[]>;
    getBookmark (bid: String): Promise<any>;
    getAllBookmarks (): Promise<any>;
}