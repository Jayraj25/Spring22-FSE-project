/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmarks from "../models/Bookmarks";
import bookmarksModel from "../mongoose/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = ():BookmarkDao => {
        if (this.bookmarkDao == null) {
            this.bookmarkDao = new BookmarkDao();
        }
        return this.bookmarkDao;
    }

    private constructor() {}

    /**
     * Inserts bookmark instance in the database.
     * @param {string} uid user's primary key.
     * @param {string} tid primary key of tuit.
     * @returns Promise To be notified when the bookmark instance is inserted in the database.
     */
    async userBookmarksTuit(uid: String, tid: String): Promise<any> {
        return await bookmarksModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});
    }
    
    /**
     * Retrieve all the bookmarks of a specific user from the database.
     * @param {string} uid user's primary key.
     * @returns Promise To be notified when all the instances are retrieved from the database.
     */
    async getBookmarksList(uid: String): Promise<Bookmarks[]> {
        return await bookmarksModel.find({bookmarkedBy: uid}).populate("bookmarkedTuit").exec();
    }

    /**
     * Retrieve bookmarks based on bookmarkid from the database.
     * @param {string} bid primary key of bookmark.
     * @returns Promise To be notified when all the instances are retrieved from the database.
     */
    async getBookmark(bid: String): Promise<any> {
        return await bookmarksModel.findById(bid).populate("bookmarkedBy").populate("bookmarkedTuit").exec();
    }

    /**
     * Retrieve all the bookmark instances from the database.
     * @returns Promise To be notified when all the instances are retrieved from the database.
     */
    async getAllBookmarks(): Promise<any> {
        return await bookmarksModel.find().populate("bookmarkedTuit").populate("bookmarkedBy").exec();
    }

    /**
     * Remove bookmark instance from the database.
     * @param {string} uid user's primary key.
     * @param {string} tid primary key of tuit.
     * @returns Promise To be notified when the bookmark instance is removed from the database.
     */
     async userUnbookmarksTuit(uid: String, tid: String): Promise<any> {
        return await bookmarksModel.deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});
    }
}