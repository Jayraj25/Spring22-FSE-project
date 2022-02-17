import { Request, Response, Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import FollowDao from "../daos/FollowDao";
import followControllerI from "../interfaces/FollowController";
import Follow from "../models/Follow";

export default class FollowController implements followControllerI {
    private static followDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if(this.followController == null) {
            this.followController = new FollowController();
            app.post("/api/:uid/follows/:userFollowedId", this.followController.userFollowsUser);
            app.delete("/api/:uid/follows/:userUnfollowedId", this.followController.userUnfollowsUser);
            app.get("/api/:uid/followers",this.followController.getFollowersList);
            app.get("/api/:uid/following",this.followController.getFollowingList);
            app.get("/api/followerFollowing/:fid", this.followController.getFollowerFollowing);
        }
        return this.followController;
    }

    private constructor() {}

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid,req.params.userFollowedId).then((follow: Follow) => res.json(follow));
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid,req.params.userUnfollowedId).then((status) => res.json(status));
    getFollowersList = (req: Request, res: Response) => 
        FollowController.followDao.getFollowersList(req.params.uid).then((followers: Follow) => res.json(followers));
    getFollowingList = (req: Request, res: Response) => 
        FollowController.followDao.getFollowingList(req.params.uid).then((following: Follow) => res.json(following));
    getFollowerFollowing = (req: Request, res: Response) => 
        FollowController.followDao.getFollowerFollowing(req.params.fid).then((followerFollowing: Follow) => res.json(followerFollowing));
}