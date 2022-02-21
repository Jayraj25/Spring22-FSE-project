/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/Message";
import messageModel from "../mongoose/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(this.messageDao == null) {
            this.messageDao = new MessageDao();
        }
        return this.messageDao;
    }

    private constructor() {}

    /**
     * Sends the message to the user and Inserts message instance into the database.
     * @param {string} u1id primary key of user who is a sender.
     * @param {string} u2id primary key of user who is the receipient.
     * @param {Message} messageTextBody Instance to be inserted into the database.
     * @returns Promise To be notified when the message is inserted in the database.
     */
    async sendMessage(u1id: String, u2id: String, messageTextBody: Message): Promise<any> {
        console.log(messageTextBody);
        return await messageModel.create({...messageTextBody,to: u2id, from: u1id});
    }

    /**
     * Retrieves all the messages sent by a user from the database.
     * @param {string} uid user's primary key.
     * @returns Promise To be notified when the messages are retrieved from the database.
     */
    async messageListSent(uid: String): Promise<Message[]> {
        return await messageModel.find({from: uid});
    }

    /**
     * Retrieves all the messages received by a user from the database.
     * @param {string} uid user's primary key.
     * @returns Promise To be notified when the messages are retrieved from the database.
     */
    async messageListReceived(uid: String): Promise<Message[]> {
        return await messageModel.find({to: uid});
    }

    /**
     * Removes the message instance from the database.
     * @param {string} uid user's primary key.
     * @param {string} mid primary key of message.
     * @returns Promise To be notified when the message is removed from the database.
     */
     async deleteMessage(uid: String, mid: String): Promise<any> {
        return await messageModel.deleteOne({_id: mid, from: uid});
    }

    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    async getAllMessages(): Promise<Message[]> {
        return await messageModel.find();
    }

    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
     async getMessage(mid: String): Promise<any> {
        return await messageModel.findById(mid);
    }
}