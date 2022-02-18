import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmarks from "../models/Bookmarks";
import bookmarksModel from "../mongoose/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    public static getInstance = ():BookmarkDao => {
        if (this.bookmarkDao == null) {
            this.bookmarkDao = new BookmarkDao();
        }
        return this.bookmarkDao;
    }

    private constructor() {}

    async userBookmarksTuit(uid: String, tid: String): Promise<any> {
        return await bookmarksModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});
    }

    async userUnbookmarksTuit(uid: String, tid: String): Promise<any> {
        return await bookmarksModel.deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});
    }
    
    async getBookmarksList(uid: String): Promise<Bookmarks[]> {
        return await bookmarksModel.find({bookmarkedBy: uid}).populate("bookmarkedTuit").exec();
    }

    async getBookmark(bid: String): Promise<any> {
        return await bookmarksModel.findById(bid).populate("bookmarkedBy").populate("bookmarkedTuit").exec();
    }

    async getAllBookmarks(): Promise<any> {
        return await bookmarksModel.find().populate("bookmarkedTuit").populate("bookmarkedBy").exec();
    }
}