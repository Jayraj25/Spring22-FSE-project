/**
 * @file Controller RESTful Web service API for follows resource
 */
import { Request, Response, Express } from "express";
import FollowDao from "../daos/FollowDao";
import followControllerI from "../interfaces/FollowControllerI";
import Follow from "../models/Follow";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/:uid/follows/:userFollowedId to create a new follow instance for
 *     a given users</li>
 *     <li>GET /api/:uid/followers to retrieve all the followers of a user</li>
 *     <li>GET /api/:uid/following to retrieve all the users that are being 
 *      followed by a particular user</li>
 *     <li>GET /api/follows/ to retrieve all follows instances from the DB</li>
 *     <li>GET /api/followerFollowing/:fid to retrieve a particular follow instance </li>
 *     <li>DELETE /api/:uid/follows/:userUnfollowedId to remove a particular follow 
 *      instance when a user unfollows another user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements followControllerI {

    private static followDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(this.followController == null) {
            this.followController = new FollowController();

            //Restful User Web service API
            app.post("/api/:uid/follows/:userFollowedId", this.followController.userFollowsUser);
            app.get("/api/:uid/followers",this.followController.getFollowersList);
            app.get("/api/:uid/following",this.followController.getFollowingList);
            app.get("/api/follows/",this.followController.getAllFollowersFollowing);
            app.get("/api/followerFollowing/:fid", this.followController.getFollowerFollowing);
            app.delete("/api/:uid/follows/:userUnfollowedId", this.followController.userUnfollowsUser);
        }
        return this.followController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including parameters
     * containing id's of follower and following user for the new follow instance to be created in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follow instance that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid,req.params.userFollowedId).then((follow: Follow) => res.json(follow));
    
    /**
     * Retrieves all users from the database that follow a particular user and returns an array of users.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    getFollowersList = (req: Request, res: Response) => 
        FollowController.followDao.getFollowersList(req.params.uid).then((followers: Follow) => res.json(followers));
    
    /**
     * Retrieves all users from the database that are being followed by a particular user and returns an array of users.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    getFollowingList = (req: Request, res: Response) => 
        FollowController.followDao.getFollowingList(req.params.uid).then((following: Follow) => res.json(following));
    
    /**
     * Retrieves all follow instance from the database and returns an array of follow instances.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing all the follow objects
     */
    getAllFollowersFollowing = (req: Request, res: Response) => {
        FollowController.followDao.getAllFollowerFollowing().then((result: Follow[]) => res.json(result))
    }

    /**
     * Retrieves a follow instance based on the id from the database.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow object
     */
    getFollowerFollowing = (req: Request, res: Response) => 
        FollowController.followDao.getFollowerFollowing(req.params.fid).then((followerFollowing: Follow) => res.json(followerFollowing));
    
    /**
     * @param {Request} req Represents request from client, including path
     * parameter identifying the primary key of the two different users respectively 
     * to be removed from follow instance
     * @param {Response} res Represents response to client, including status
     * on whether deleting a follow instance was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid,req.params.userUnfollowedId).then((status) => res.json(status));
}