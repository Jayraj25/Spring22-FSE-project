/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Request, Response, Express } from "express";
import LikesDao from "../daos/LikesDao";
import LikeControllerI from "../interfaces/LikeControllerI";
import Likes from "../models/Likes";

/**
 * @class LikesController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/likes/:tid to create a new likes instance for
 *     a given user and tuit</li>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuit instances liked by a user</li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users for a given tuit</li>
 *     <li>DELETE /api/users/:uid/likes/:tid to remove a particular like instance</li>
 * </ul>
 * @property {LikesDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikesController} likesController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikesController implements LikeControllerI {
    
    private static likeDao: LikesDao = LikesDao.getInstance();
    private static likesController: LikesController | null = null;

    private constructor() {}

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @return LikesController
     */
    public static getInstance = (app: Express): LikesController => {
        if(this.likesController == null) {
            this.likesController = new LikesController();

            //Restful User Web service API
            app.post("/api/users/:uid/likes/:tid", this.likesController.userLikesTuit);
            app.get("/api/users/:uid/likes", this.likesController.findAllTuitsLikedByUser);
            app.get("/api/tuits/:tid/likes", this.likesController.findAllUsersThatLikedTuit);
            app.delete("/api/users/:uid/likes/:tid", this.likesController.userUnlikesTuit);
        }
    return this.likesController;
    }

    /**
     * Retrieves all tuits from the database that are liked by a user and returns an array of Likes.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Likes objects
     */
    findAllTuitsLikedByUser = (req: Request, res: Response) => 
        LikesController.likeDao.findAllTuitsLikedByUser(req.params.uid).then((likes: Likes[]) => res.json(likes));
    
    /**
     * Retrieves all users from the database that liked by a particular tuit and returns an array of Likes.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Likes objects
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) => 
        LikesController.likeDao.findAllUsersThatLikedTuit(req.params.tid).then((likes: Likes[]) => res.json(likes));
    
    /**
     * @param {Request} req Represents request from client, including parameters
     * containing user id and tuit id for the new like instance to be created in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new like instance that was inserted in the
     * database
     */
    userLikesTuit = (req: Request, res: Response) => 
        LikesController.likeDao.userLikesTuit(req.params.tid, req.params.uid).then((likes: Likes) => res.json(likes));
    
    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid and uid identifying the primary key of the tuit and user respectively to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a like instance was successful or not
     */
    userUnlikesTuit = (req: Request, res: Response) => 
        LikesController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid).then((status) => res.json(status));
}