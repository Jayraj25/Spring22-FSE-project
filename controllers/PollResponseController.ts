/**
 * @file Controller RESTful Web service API for pollResponses resource
 */
import { Request, Response, Express } from "express";
import PollResponseDao from "../daos/PollResponseDao";
import PollResponseControllerI from "../interfaces/PollResponseControllerI";
import PollResponse from "../models/PollResponse";

/**
 * @class PollResponseController Implements RESTful Web service API for pollResponses resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/user/:uid/response/polls/:pid to create a new pollResponse instance for
 *     a given user and poll</li>
 *     <li>GET /api/users/:uid/pollsresponded to retrieve a particular pollResponse instances from a specified user</li>
 *     <li>GET /api/usersrepsonded/polls/:pid to retrieve all users pollResponse for certain poll </li>
 *     <li>GET /api/polls/:pid/ to retrieve the pollResponse instances for a given poll id</li>
 *     <li>PUT /api/users/:uid/polls/:pid to modify an individual pollResponse instance </li>
 *     <li>DELETE /api/users/:uid/deleteresponse/polls/:pid to remove a particular pollResponse instance from
 *     specified user and poll</li>
 * </ul>
 * @property {PollResponseDao} pollResponseDao Singleton DAO implementing pollResponse CRUD operations
 * @property {PollResponseController} pollResponseController Singleton controller implementing
 * RESTful Web service API
 */
export default class PollResponseController implements PollResponseControllerI {
    private static pollResponseDao:PollResponseDao = PollResponseDao.getInstance();
    private static pollResponseController: PollResponseController | null = null;

    private constructor() {}

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @return PollResponseController
     */
    public static getInstance = (app: Express): PollResponseController => {
        if(PollResponseController.pollResponseController == null) {
            PollResponseController.pollResponseController = new PollResponseController();

            //Restful User Web service API
            app.get('/api/users/:uid/pollsresponded',PollResponseController.pollResponseController.findPollResponsesByUser);
            app.get('/api/usersrepsonded/polls/:pid',PollResponseController.pollResponseController.findAllUsersReplyPollResponse);
            app.get('/api/polls/:pid',PollResponseController.pollResponseController.findPollResponseByPollId);
            app.post('/api/user/:uid/response/polls/:pid',PollResponseController.pollResponseController.createPollResponse);
            app.put('/api/pollResponses/:tid',PollResponseController.pollResponseController.updatePollResponse);
            app.delete('/api/users/:uid/polls/:pid', PollResponseController.pollResponseController.deletePollResponse);
        }
        return PollResponseController.pollResponseController;
    }


    /**
     * Retrieves all pollResponses from the database for a particular user and returns
     * an array of pollResponses.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the pollResponse objects
     */
    findPollResponsesByUser = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "my" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        // @ts-ignore
        PollResponseController.pollResponseDao.findPollResponsesByUser(userId)
            .then((pollResponses: PollResponse[]) => res.json(pollResponses));
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the pollResponse to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the pollResponse that matches the user ID
     */
    findAllUsersReplyPollResponse = (req: Request, res: Response) =>
        PollResponseController.pollResponseDao.findAllUsersReplyPollResponse(req.params.pid)
            .then((pollResponses: PollResponse) => res.json(pollResponses));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter pid identifying the primary key of the pollResponse to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the pollResponse that matches the poll ID
     */
    findPollResponseByPollId = (req: Request, res: Response) =>
        PollResponseController.pollResponseDao.findPollResponseByPollId(req.params.pid)
            .then((pollResponses: PollResponse) => res.json(pollResponses));

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new pollResponse to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new pollResponse that was inserted in the
     * database
     */
    createPollResponse = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "my" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        // let userId = req.session['profile']._id;
        console.log(userId);
        // @ts-ignore
        PollResponseController.pollResponseDao.createPollResponse(userId,req.params.pid, req.body)
            .then((pollResponse: PollResponse) => res.json(pollResponse));
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the pollResponse to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a pollResponse was successful or not
     */
    updatePollResponse = (req: Request, res: Response) =>
        PollResponseController.pollResponseDao.updatePollResponse(req.params.uid,req.params.tid,req.body)
            .then(status => res.json(status));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the pollResponse to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a pollResponse was successful or not
     */
     deletePollResponse = (req: Request, res: Response) =>
     PollResponseController.pollResponseDao.deletePollResponse(req.params.tid,req.params.uid)
         .then(status => res.json(status));

}