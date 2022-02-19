/**
 * @file Controller RESTful Web service API for messages resource
 */
import { Request, Response, Express } from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
import Message from "../models/Message";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/:u1id/messages/:u2id to create a new message instance for
 *     a given users</li>
 *     <li>GET /api/:uid/listSentMessages to retrieve all the sent messages by a user</li>
 *     <li>GET /api/:uid/listReceivedMessages to retrieve all the messages received by a user</li>
 *     <li>DELETE /api/:uid/removes/:mid to remove a particular message instance sent by a user</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing tuit CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {

    private static messageController: MessageController | null = null;
    private static messageDao = MessageDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (this.messageController == null) {
            this.messageController = new MessageController();

            //Restful User Web service API
            app.post("/api/:u1id/messages/:u2id",this.messageController.sendMessage);
            app.get("/api/:uid/listSentMessages",this.messageController.messageListSent);
            app.get("/api/:uid/listReceivedMessages",this.messageController.messageListReceived);
            app.delete("/api/:uid/removes/:mid",this.messageController.deleteMessage);
        }
        return this.messageController;
    }

    private constructor () {}

    /**
     * user1 sends message to user2.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message object that was inserted.
     */
    sendMessage = (req: Request, res: Response) => {
        MessageController.messageDao.sendMessage(req.params.u1id,req.params.u2id,req.body).then((message: Message) => res.json(message));
    }

    /**
     * Retrieves all messages from the database that are sent by a particular user and returns
     * an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    messageListSent = (req: Request, res: Response) => {
        MessageController.messageDao.messageListSent(req.params.uid).then((messages: Message[]) => res.json(messages));
    }

    /**
     * Retrieves all messages from the database that are received by a particular user and returns
     * an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    messageListReceived = (req: Request, res: Response) => {
        MessageController.messageDao.messageListReceived(req.params.uid).then((messages: Message[]) => res.json(messages));
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter uid and mid identifying the primary key of the user and message to be removed respectively.
     * @param {Response} res Represents response to client, including status
     * on whether deleting a message was successful or not
     */
    deleteMessage = (req: Request, res: Response) => {
        MessageController.messageDao.deleteMessage(req.params.uid,req.params.mid).then((status) => res.json(status));
    }
}