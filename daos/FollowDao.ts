/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import followDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/Follow";
import followModel from "../mongoose/FollowModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements followDaoI {

    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(this.followDao == null) {
            this.followDao = new FollowDao();
        }
        return this.followDao;
    }

    private constructor() {}

    /**
     * Insert follow instance in the database. Here, one user follows another user.
     * @param {string} uid user's primary key from which follow request is made.
     * @param {string} userFollowedId user's primary key where the follow request has been sent.
     * @returns Promise To be notified when the follow instance is inserted in the database.
     */
    async userFollowsUser(uid: String, userFollowedId: String): Promise<any> {
        return await followModel.create({userFollower: uid, userFollowing: userFollowedId});
    }

    /**
     * Retrieves the list of followers of a particular user from the database.
     * @param {string} uid user's primary key.
     * @returns Promise To be notified when the list is retrieved from the database.
     */
    async getFollowersList(uid: String): Promise<any> {
        return await followModel.find({userFollowing: uid}).populate("userFollower").exec();
    }

    /**
     * Retrieves the list of users following a particular user from the database.
     * @param {string} uid user's primary key.
     * @returns Promise To be notified when the list is retrieved from the database.
     */
    async getFollowingList(uid: String): Promise<any> {
        return await followModel.find({userFollower: uid}).populate("userFollowing").exec();
    }

    /**
     * Retrieves the instance of follow based on id from database.
     * @param {string} fid follows primary key.
     * @returns Promise To be notified when the list is retrieved from the database.
     */
    async getFollowerFollowing(fid: string): Promise<any> {
        return await followModel.findById(fid).populate("userFollower").populate("userFollowing").exec();
    }

    /**
     * Retrieves all the instances of follow from database.
     * @returns Promise To be notified when the list is retrieved from the database.
     */
    async getAllFollowerFollowing(): Promise<any> {
        return await followModel.find();
    }

    /**
     * Remove follow instance from the database. Here, one user unfollows another user.
     * @param {string} uid user's primary key from which unfollow request is made.
     * @param {string} userUnfollowedId user's primary key where the unfollow request has been sent.
     * @returns Promise To be notified when the follow instance is removed from the database.
     */
     async userUnfollowsUser(uid: String, userUnfollowedId: String): Promise<any> {
        return await followModel.deleteOne({userFollower: uid, userFollowing: userUnfollowedId});
    }
}