/**
 * @file Follow data model where one user follows another user.
 */
import User from "./User";

/**
 * @typedef Follow Represents the follower and following on the tuiter app.
 * @property {User} userFollower The user who requested to follow another user.
 * @property {User} userFollowing The user who recieves to follow request from another user.
 */
export default interface Follow {
    userFollower: User;
    userFollowing: User;
}