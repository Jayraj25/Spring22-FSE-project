/**
 * @file Declares DAO interface managing Data Storage Access for messages.
 */
import Message from "../models/Message";

export default interface MessageDaoI {
    sendMessage (u1id: String, u2id: String, messageText: Message): Promise<any>;
    messageListSent (uid: String): Promise<Message[]>;
    messageListReceived (uid: String): Promise<Message[]>;
    getAllMessages (): Promise<Message[]>;
    getMessage (mid: String): Promise<any>;
    deleteMessage (uid: String, mid: String): Promise<any>;
}