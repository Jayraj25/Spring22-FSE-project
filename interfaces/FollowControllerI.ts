import { Request, Response } from "express";

export default interface followControllerI {
    userFollowsUser(req: Request, res: Response): void;
    userUnfollowsUser(req: Request, res: Response): void;
    getFollowersList(req: Request, res: Response): void;
    getFollowingList(req: Request, res: Response): void;
    getFollowerFollowing(req: Request, res: Response): void;
}