import { Query } from "mongoose";
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import messageModel from "../mongoose/MessageModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    public static getInstance = (): MessageDao => {
        if(this.messageDao == null) {
            this.messageDao = new MessageDao();
        }
        return this.messageDao;
    }

    private constructor() {}

    async sendMessage(u1id: String, u2id: String, messageTextBody: Message): Promise<any> {
        console.log(messageTextBody);
        return await messageModel.create({...messageTextBody,to: u2id, from: u1id});
    }

    async deleteMessage(uid: String, mid: String): Promise<any> {
        return await messageModel.deleteOne({_id: mid, from: uid});
    }

    async messageListSent(uid: String): Promise<Message[]> {
        return await messageModel.find({from: uid});
    }

    async messageListReceived(uid: String): Promise<Message[]> {
        return await messageModel.find({to: uid});
    }
}