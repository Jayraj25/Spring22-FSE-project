import { Request, Response, Express } from "express";
import LikesDao from "../daos/LikesDao";
import LikeControllerI from "../interfaces/LikeControllerI";
import Likes from "../models/Likes";

export default class LikesController implements LikeControllerI {
    private static likeDao: LikesDao = LikesDao.getInstance();
    private static likesController: LikesController | null = null;

    private constructor() {}


    public static getInstance = (app: Express): LikesController => {
        if(this.likesController == null) {
            this.likesController = new LikesController();
            app.get("/api/users/:uid/likes", this.likesController.findAllTuitsLikedByUser);
            app.get("/api/tuits/:tid/likes", this.likesController.findAllUsersThatLikedTuit);
            app.post("/api/users/:uid/likes/:tid", this.likesController.userLikesTuit);
            app.delete("/api/users/:uid/likes/:tid", this.likesController.userUnlikesTuit);
        }
    return this.likesController;
    }

    findAllTuitsLikedByUser = (req: Request, res: Response) => 
        LikesController.likeDao.findAllTuitsLikedByUser(req.params.uid).then((likes: Likes[]) => res.json(likes));
    findAllUsersThatLikedTuit = (req: Request, res: Response) => 
        LikesController.likeDao.findAllUsersThatLikedTuit(req.params.tid).then((likes: Likes[]) => res.json(likes));
    userLikesTuit = (req: Request, res: Response) => 
        LikesController.likeDao.userLikesTuit(req.params.tid, req.params.uid).then((likes: Likes) => res.json(likes));
    userUnlikesTuit = (req: Request, res: Response) => 
        LikesController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid).then((status) => res.json(status));
}