import { Request, Response, Express } from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
import Message from "../models/Message";

export default class MessageController implements MessageControllerI {

    private static messageController: MessageController | null = null;
    private static messageDao = MessageDao.getInstance();

    public static getInstance = (app: Express): MessageController => {
        if (this.messageController == null) {
            this.messageController = new MessageController();
            app.post("/api/:u1id/messages/:u2id",this.messageController.sendMessage);
            app.get("/api/:uid/listSentMessages",this.messageController.messageListSent);
            app.get("/api/:uid/listReceivedMessages",this.messageController.messageListReceived);
            app.delete("/api/:uid/removes/:mid",this.messageController.deleteMessage);
        }
        return this.messageController;
    }

    private constructor () {}

    sendMessage = (req: Request, res: Response) => {
        MessageController.messageDao.sendMessage(req.params.u1id,req.params.u2id,req.body).then((message: Message) => res.json(message));
    }
    messageListSent = (req: Request, res: Response) => {
        MessageController.messageDao.messageListSent(req.params.uid).then((messages: Message[]) => res.json(messages));
    }
    messageListReceived = (req: Request, res: Response) => {
        MessageController.messageDao.messageListReceived(req.params.uid).then((messages: Message[]) => res.json(messages));
    }
    deleteMessage = (req: Request, res: Response) => {
        MessageController.messageDao.deleteMessage(req.params.uid,req.params.mid).then((status) => res.json(status));
    }
}