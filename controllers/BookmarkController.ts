import { Express, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import BookmarkDao from "../daos/BookmarksDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import Bookmarks from "../models/Bookmarks";

export default class BookmarkController implements BookmarkControllerI {

    private static bookmarkController: BookmarkController | null = null;
    private static bookmarkDao = BookmarkDao.getInstance();

    public static getInstance = (app: Express): BookmarkController => {
        if(this.bookmarkController == null) {
            this.bookmarkController = new BookmarkController();
            app.post("/api/:uid/bookmark/:tid",this.bookmarkController.userBookmarksTuit);
            app.delete("/api/:uid/bookmark/:tid",this.bookmarkController.userUnbookmarksTuit);
            app.get("/api/:uid/bookmarks",this.bookmarkController.getBookmarksList);
            app.get("/api/bookmark/:bid",this.bookmarkController.getBookmark);
            app.get("/api/bookmarks/",this.bookmarkController.getAllBookmarks);
        }
        return this.bookmarkController;
    }

    private constructor() {}
    

    userBookmarksTuit = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid,req.params.tid).then((bookmark: Bookmarks) => res.json(bookmark));
    }

    userUnbookmarksTuit = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid,req.params.tid).then((status) => res.json(status));
    }

    getBookmarksList = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.getBookmarksList(req.params.uid).then((bookmarks: Bookmarks[]) => res.json(bookmarks));
    }

    getBookmark = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.getBookmark(req.params.bid).then((bookmarks: Bookmarks[]) => res.json(bookmarks));
    }

    getAllBookmarks = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao.getAllBookmarks().then((bookmarks: Bookmarks[]) => res.json(bookmarks));
    }
}