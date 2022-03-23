/**
 * @file Tuit data model where a user can post a tuit.
 */
import User from "./User";

/**
 * @typedef Tuit Represents the tuit done by a user.
 * @property {string} tuit The tuit done by the user.
 * @property {Date} postedOn Time when the user tuited.
 * @property {User} createdBy The user who created the tuit.
 */
export default interface Tuit {
    tuit: string;
    postedOn?: Date;
    createdBy: User;
}