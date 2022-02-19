/**
 * @file Represents message data model where a user can send message to other user.
 */
import User from "./User";

/**
 * @typedef Message represents the text message done by a user.
 * @property {string} messageText the message body.
 * @property {User} to the message sender.
 * @property {User} from the message recepient.
 * @property {Date} sentOn the Date time when message was sent.
 */
export default interface Message {
    messageText: string,
    to?: User,
    from?: User,
    sentOn?: Date
};