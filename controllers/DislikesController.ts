/**
 * @file Controller RESTful Web service API for dislikes resource
 */
import { Request, Response, Express } from "express";
import TuitDao from "../daos/TuitDao";
import {Dislike} from "../models/Dislikes";
import DislikesDao from "../daos/DislikesDao";
import DislikeControllerI from "../interfaces/DislikeControllerI";

/**
 * @class DislikesController Implements RESTful Web service API for dislikes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/dislikes/:tid to create a new likes instance for
 *     a given user and tuit</li>
 *     <li>GET /api/users/:uid/dislikes to retrieve all the tuit instances liked by a user</li>
 *     <li>GET /api/tuits/:tid/dislikes to retrieve all users for a given tuit</li>
 *     <li>PUT /api/users/:uid/dislikes/:tid to update a dislikes instance for a given user and tuit</li>
 *     <li>DELETE /api/users/:uid/dislikes/:tid to remove a particular like instance</li>
 * </ul>
 * @property {DislikesDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
 * @property {DislikesController} dislikesController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikesController implements DislikeControllerI {

    private static dislikesDao: DislikesDao = DislikesDao.getInstance();
    private static dislikesController: DislikesController | null = null;
    private static tuitDao: TuitDao = TuitDao.getInstance();

    private constructor() {}

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @return DislikesController
     */
    public static getInstance = (app: Express): DislikesController => {
        if (this.dislikesController == null) {
            this.dislikesController = new DislikesController();

            //Restful User Web service API
            app.post("/api/users/:uid/dislikes/:tid", this.dislikesController.userDislikesTuit);
            app.get("/api/users/:uid/dislikes", this.dislikesController.findAllTuitsDislikedByUser);
            app.get("/api/tuits/:tid/dislikes", this.dislikesController.findAllUsersThatDislikedTuit);
            app.put("/api/users/:uid/dislikes/:tid", this.dislikesController.userTogglesTuitDislikes);
            app.delete("/api/users/:uid/likes/:tid", this.dislikesController.userUnDislikesTuit);
        }
        return this.dislikesController;
    }


    /**
     * Retrieves all tuits from the database that are dislikes by a user and returns an array of Dislikes.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the Dislikes objects
     */
    async findAllTuitsDislikedByUser(req: Request, res: Response) {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session["profile"];
        const userId = uid === "me" && profile ? profile._id : uid;
        if (userId === "me" && !profile) {
            res.sendStatus(503);
            return;
        } else {
            DislikesController.dislikesDao.findAllTuitsDislikedByUser(userId)
                .then((dislikes: Dislike[]) => {
                    const dislikesNonNullTuits = dislikes.filter(dislike => dislike.tuit);
                    const tuitsFromDislikes = dislikesNonNullTuits.map(dislike => dislike.tuit);
                    res.json(tuitsFromDislikes);
                });
            }
        }

    /**
     * Retrieves all users that have disliked a tuit and returns an array of Dislikes.
     * @param req Represents request from client
     * @param res Represents response to client, including the
     * body formatted as JSON arrays containing the Dislikes objects
     */
    async findAllUsersThatDislikedTuit(req: Request, res: Response) {
        const tid = req.params.tid;
        DislikesController.dislikesDao.findAllUsersThatDislikedTuit(tid)
            .then((dislikes: Dislike[]) => res.json(dislikes));
    }

    /**
     * Update dislikes when user toggles the dislike button.
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is disliking the tuit
     * and the tuit being disliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new disliked tuit that was inserted in the
     * database
     */
    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const dislikesDao = DislikesController.dislikesDao;
        const tuitDao = DislikesController.tuitDao;
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const userId = uid === "me" && req.session['profile'] ? req.session['profile']._id : uid;
        try {
            const userAlreadyDislikedTuit = await dislikesDao.findUserDislikesTuit(userId, tid);
            const howManyDislikes = await dislikesDao.countDislikes(tid);
            let tuit = await tuitDao.findTuitById(tid);
            if (userAlreadyDislikedTuit) {
                await dislikesDao.userUndislikesTuit(tid, userId);
                tuit.stats.dislikes = howManyDislikes - 1;
            } else {
                await dislikesDao.userDislikesTuit(tid, userId);
                tuit.stats.dislikes = howManyDislikes + 1;
            }
            await tuitDao.updateDislikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(404);
        }
    }

    /**
     * @param {Request} req Represents request from client, including parameters
     * containing user id and tuit id for the new dislike instance to be created in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislike instance that was inserted in the
     * database
     */
    userDislikesTuit = async (req: Request, res: Response) =>
        DislikesController.dislikesDao.userDislikesTuit(req.params.tid, req.params.uid)
            .then((dislike: Dislike) => res.json(dislike));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid and uid identifying the primary key of the tuit and user respectively to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a dislike instance was successful or not
     */
    userUnDislikesTuit = async (req: Request, res: Response) =>
        DislikesController.dislikesDao.userUndislikesTuit(req.params.tid, req.params.uid)
            .then((dislike: Dislike) => res.json(dislike));
}
