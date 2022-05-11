/**
 * @file Controller RESTful Web service API for polls resource
 */
import { Request, Response, Express } from "express";
import PollControllerI from "../interfaces/PollControllerI";
import Poll from "../models/Poll";
import PollDao from "../daos/PollDao";

/**
 * @class PollController Implements RESTful Web service API for polls resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/creates/polls to create a new poll instance for a given user</li>
 *     <li>GET  /api/polls to get all polls
 *     <li>GET /api/polls/:pid to get poll by poll id
 *     <li>DELETE /api/users/:uid/deletepoll/polls/:pid to delete a poll
 *     <li>PUT /api/users/:uid/close/polls/:pid to close a poll
 *     <li>GET /api/users/:uid/pollscreated to find all polls user created
 * </ul>
 * @property {PollDao} pollDao Singleton DAO implementing poll CRUD operations
 * @property {PollController} pollController Singleton controller implementing
 * RESTful Web service API
 */
export default class PollController implements PollControllerI {
    private static pollDao:PollDao = PollDao.getInstance();
    private static pollController: PollController | null = null;

    private constructor() {}

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @return PollController
     */
    public static getInstance = (app: Express): PollController => {
        if(PollController.pollController == null) {
            PollController.pollController = new PollController();

            //Restful User Web service API
            app.post('/api/users/:uid/creates/polls',PollController.pollController.createPoll);
            app.get('/api/polls',PollController.pollController.getAllPolls);
            app.get('/api/polls/:pid',PollController.pollController.getPollById);
            app.delete('/api/users/:uid/deletepoll/polls/:pid', PollController.pollController.deletePoll);
            app.put('/api/users/:uid/close/polls/:pid', PollController.pollController.closePoll);
            app.get('/api/users/:uid/pollscreated', PollController.pollController.getPollByUser);
            app.delete('/api/polls/deleteByQuestion/:pollQuestion',PollController.pollController.deletePollByQuestion);

        }
        return PollController.pollController;
    }



    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new poll to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new poll that was inserted in the
     * database
     */
    createPoll = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "my" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        // let userId = req.session['profile']._id;
        //console.log(userId);
        // @ts-ignore
        // console.log(req.session['profile']);
        PollController.pollDao.createPoll(userId, req.body)
            .then((poll: Poll) => res.json(poll));
    }

    /**
     * Retrieves all polls from the database and returns an array of polls.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the poll objects
     */
    getAllPolls = (req: Request, res: Response) => {
        PollController.pollDao.getAllPolls()
            .then((poll: Poll[]) => res.json(poll));
    }

    /**
     * Retrieves a poll from the database by id and returns a poll.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the poll object
     */
    getPollById = (req: Request, res: Response) => {
        PollController.pollDao.getPollById(req.params.pid)
            .then((poll: Poll) => res.json(poll));
    }


    /**
     * Retrieves all polls from the database created by a user and returns a poll array.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the poll objects
     */
    getPollByUser = (req:Request, res:Response) => {
        // @ts-ignore
        let userId = req.params.uid === "my" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        PollController.pollDao.getPollByUser(userId).then((poll: Poll[]) => res.json(poll));
    }


    /**
     * Deletes a poll if the delete request is from the creator. Else ignores the request
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the status of the delete operation
     */
    deletePoll = async (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "my" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        console.log(userId);



        const poll = await PollController.pollDao.getPollById(req.params.pid);
        if(poll != null) {
            console.log(poll.createdBy._id.toString() === userId.toString());
            if (poll.createdBy._id.toString() === userId.toString()) {
                PollController.pollDao.deletePoll(req.params.pid)
                    .then((status) => res.json(status));
            }
            else {
                res.json("Only creator can delete poll")
            }
        }

        else {
            res.sendStatus(404);
        }

    }


    /**
     * Close a poll if the request is from the creator. Else ignore the request
     * @param {Request} req Represents request from client
     * @param {Response} res Represents a response to client with the status of close operation
     */
    closePoll = async(req: Request, res: Response) => {
        // @ts-ignore
        //compares userId to poll.createdBy ID
        let userId = req.params.uid === "my" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        console.log(userId);

        const poll = await PollController.pollDao.getPollById(req.params.pid);
        console.log(poll.createdBy._id);
        if(poll != null) {
            if (poll.createdBy._id.toString() === userId.toString()) {
                PollController.pollDao.closePoll(req.params.pid).then((status) => res.json(status));
            }
            else {
                res.json("Only creator can close poll")
            }
        }

        else {
            res.sendStatus(404);
        }
    }
    /**
     * @param {Request} req Represents request from client, including path
     * parameter content identifying the matching creator of the poll to be deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting a poll was successful or not
     */
    deletePollByQuestion = (req: Request, res: Response) =>
        PollController.pollDao.deletePollByQuestion(req.params.pollQuestion)
            .then(status => res.json(status));

}

