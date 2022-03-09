/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import { Express, Request, Response } from "express";
import BookmarkDao from "../daos/BookmarksDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import Bookmarks from "../models/Bookmarks";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/:uid/bookmark/:tid to create a new bookmark instance for
 *     a given user and tuit</li>
 *     <li>GET /api/:uid/bookmarks to retrieve all the bookmarks done by a user</li>
 *     <li>GET /api/bookmark/:bid to retrieve a particular bookmark
 *     <li>GET /api/bookmarks/ to retrieve all bookmarks</li>
 *     <li>DELETE /api/:uid/bookmark/:tid to remove a particular bookmark 
 *      instance given a userid and tuitid</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing follow CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {

    private static bookmarkController: BookmarkController | null = null;
    private static bookmarkDao = BookmarkDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(this.bookmarkController == null) {
            this.bookmarkController = new BookmarkController();

            //Restful User Web service API
            app.post("/api/:uid/bookmark/:tid",this.bookmarkController.userBookmarksTuit);
            app.get("/api/:uid/bookmarks",this.bookmarkController.getBookmarksList);
            app.get("/api/bookmark/:bid",this.bookmarkController.getBookmark);
            app.get("/api/bookmarks/",this.bookmarkController.getAllBookmarks);
            app.delete("/api/:uid/bookmark/:tid",this.bookmarkController.userUnbookmarksTuit);
        }
        return this.bookmarkController;
    }

    private constructor() {}
    
    /**
     * Create a bookmark instance.
     * @param {Request} req Represents request from client, including parameters
     * containing id's of user and tuit respectively to be created in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark instance that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid,req.params.tid)
            .then((bookmark: Bookmarks) => res.json(bookmark));
    }

    /**
     * Retrieves all bookmarks instance by a particular user from the database and
     * returns an array of bookmarks instances.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmarks objects
     */
    getBookmarksList = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.getBookmarksList(req.params.uid)
            .then((bookmarks: Bookmarks[]) => res.json(bookmarks));
    }

    /**
     * Retrieves a specific bookmarks instance from the database and returns a single bookmark instances.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the bookmark objects
     */
    getBookmark = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.getBookmark(req.params.bid)
            .then((bookmarks: Bookmarks[]) => res.json(bookmarks));
    }

    /**
     * Retrieves all bookmarks instance from the database and returns an array of bookmarks instances.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmarks objects
     */
    getAllBookmarks = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.getAllBookmarks().then((bookmarks: Bookmarks[]) => res.json(bookmarks));
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter identifying the primary key of user and tuit respectively 
     * to be removed from bookmark instance
     * @param {Response} res Represents response to client, including status
     * on whether deleting a bookmark instance was successful or not
     */
     userUnbookmarksTuit = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid,req.params.tid)
            .then((status) => res.json(status));
    }
}