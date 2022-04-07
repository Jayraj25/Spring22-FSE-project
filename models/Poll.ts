/**
 * @file Declares poll data type representing a poll
 */
import User from "./User";

/**
 * @typedef Poll Represents a poll which a user creates
 * @property {User} createdUser User creating the tuit
 */
export default interface Poll {
    pollQuestion: string,
    pollOptions: string[],
    postedOn?: Date;
    createdBy: User,
    closed: boolean
};