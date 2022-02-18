import User from "./User";

export default interface Message {
    messageText: string,
    to?: User,
    from?: User,
    sentOn?: Date
};