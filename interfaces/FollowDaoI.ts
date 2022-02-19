/**
 * @file Declares DAO interface managing Data Storage Access for follows.
 */

export default interface followDaoI {
    userFollowsUser (uid: String, userFollowedId: String): Promise<any>;
    userUnfollowsUser (uid: String, userUnfollowedId: String): Promise<any>;
    getFollowersList (uid: String): Promise<any>;
    getFollowingList (uid: String): Promise<any>;
    getFollowerFollowing (fid: String): Promise<any>;
}