import { Request, Response } from "express";

export default interface BookmarkControllerI {
    userBookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    getBookmarksList (req: Request, res: Response): void;
    getBookmark (req: Request, res: Response): void;
    getAllBookmarks (req: Request, res: Response): void;
}