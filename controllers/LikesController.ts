/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Request, Response, Express } from "express";
import LikesDao from "../daos/LikesDao";
import LikeControllerI from "../interfaces/LikeControllerI";
import Likes from "../models/Likes";
import TuitDao from "../daos/TuitDao";

/**
 * @class LikesController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuit instances liked by a user</li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users for a given tuit</li>
 *     <li>PUT /api/users/:uid/likes/:tid to update a likes instance for a given user and tuit</li>
 *     <li>DELETE /api/users/:uid/likes/:tid to remove a particular like instance</li>
 * </ul>
 * @property {LikesDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikesController} likesController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikesController implements LikeControllerI {

    private static likeDao: LikesDao = LikesDao.getInstance();
    private static likesController: LikesController | null = null;
    private static tuitDao: TuitDao = TuitDao.getInstance();

    private constructor() {
    }

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @return LikesController
     */
    public static getInstance = (app: Express): LikesController => {
        if (this.likesController == null) {
            this.likesController = new LikesController();

            //Restful User Web service API
            // app.post("/api/users/:uid/likes/:tid", this.likesController.userLikesTuit);
            app.get("/api/users/:uid/likes", this.likesController.findAllTuitsLikedByUser);
            app.get("/api/tuits/:tid/likes", this.likesController.findAllUsersThatLikedTuit);
            app.put("/api/users/:uid/likes/:tid", this.likesController.userTogglesTuitLikes);
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
    findAllTuitsLikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session["profile"];
        const userId = uid === "me" && profile ? profile._id : uid;
        if (userId === "me" && !profile) {
            LikesController.tuitDao.findAllTuits().then(tuits => res.json(tuits));
            // res.sendStatus(503);
            // return;
        } else {
            LikesController.likeDao.findAllTuitsLikedByUser(userId)
                .then((likes: Likes[]) => {
                    const likesNonNullTuits = likes.filter(like => like.tuit);
                    const tuitsFromLikes = likesNonNullTuits.map(like => like.tuit);
                    res.json(tuitsFromLikes);
                });
        }
    }

    /**
     * Retrieves all users from the database that liked by a particular tuit and returns an array of Likes.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Likes objects
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikesController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then((likes: Likes[]) => res.json(likes));

    /**
     * @param {Request} req Represents request from client, including parameters
     * containing user id and tuit id for the new like instance to be created in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new like instance that was inserted in the
     * database
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikesController.likeDao.userLikesTuit(req.params.tid, req.params.uid)
            .then((likes: Likes) => res.json(likes));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid and uid identifying the primary key of the tuit and user respectively to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a like instance was successful or not
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikesController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid)
            .then((status) => res.json(status));

    /**
     * update likes when user toggles the like button.
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userTogglesTuitLikes = async (req: Request, res: Response) => {
        const likeDao = LikesController.likeDao;
        const tuitDao = LikesController.tuitDao;
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const userId = uid === "me" && req.session['profile'] ? req.session['profile']._id : uid;
        // @ts-ignore
            try {
                const userAlreadyLikedTuit = await likeDao.findUserLikesTuit(userId, tid);
                const howManyLikes = await likeDao.countLikes(tid);
                let tuit = await tuitDao.findTuitById(tid);
                if (userAlreadyLikedTuit) {
                    await likeDao.userUnlikesTuit(tid, userId);
                    tuit.stats.likes = howManyLikes - 1;
                } else {
                    await likeDao.userLikesTuit(tid, userId);
                    tuit.stats.likes = howManyLikes + 1;
                }
                await tuitDao.updateLikes(tid, tuit.stats);
                // res.send(tuit);
                res.sendStatus(200);
            } catch (error) {
                res.sendStatus(404);
            }
    }
}
