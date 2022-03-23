/**
 * @file Bookmark data model where a user bookmarks a tuit.
 */
import Tuit from "./Tuit";
import User from "./User";

/**
 * @typedef Bookmarks Represents the tuits which are bookmarked by a user.
 * @property {Tuit} bookmarkedTuit The tuit which is bookmarked.
 * @property {User} bookmarkedBy The user who bookmarked the tuit.
 */
export default interface Bookmarks {
    bookmarkedTuit: Tuit;
    bookmarkedBy: User;
}