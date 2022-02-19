/**
 * @file Implements DAO managing data storage of likes. Uses mongoose likesModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import Likes from "../models/Likes";
import LikeModel from "../mongoose/LikeModel";

/**
 * @class LikesDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikesDao} likeDao Private single instance of LikeDao
 */
export default class LikesDao implements LikeDaoI {

    private static likesDao: LikesDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikesDao
     */
    public static getInstance = (): LikesDao => {
        if (this.likesDao == null) {
            this.likesDao = new LikesDao();
        }
        return this.likesDao;
    }

    private constructor() {}

    /**
     * Uses LikeModel to retrieve all users that liked a particular tuit.
     * @param {string} tid primary key of tuit.
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    async findAllUsersThatLikedTuit(tid: String): Promise<Likes[]> {
        return await LikeModel.find({tuit: tid}).populate("likedBy").exec();
    }

    /**
     * Uses LikeModel to retrieve all tuits that are liked a particular user.
     * @param {string} uid Users's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findAllTuitsLikedByUser(uid: String): Promise<Likes[]> {
        return await LikeModel.find({likedBy: uid}).populate("tuit").exec();
    }

    /**
     * Insert like instance into the database.
     * @param {string} tid primary key of tuit.
     * @param {string} uid user's primary key
     * @returns Promise To be notified when the like is inserted in the database.
     */
    async userLikesTuit(tid: String, uid: String): Promise<any> {
        return await LikeModel.create({tuit: tid,likedBy: uid});
    }

    /**
     * Remove like instance from the database.
     * @param tid primary key of tuit.
     * @param uid user's primary key.
     * @returns Promise To be notified when the like is removed from the database.
     */
    async userUnlikesTuit(tid: String, uid: String): Promise<any> {
        return await LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }
}