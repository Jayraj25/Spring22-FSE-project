/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose dislikesModel
 * to integrate with MongoDB
 */
import DislikeModel from "../mongoose/DislikeModel";
import {Dislike} from "../models/Dislikes";
import DislikeDaoI from "../interfaces/DislikeDaoI";


/**
 * @class DislikesDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikesDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikesDao implements DislikeDaoI {

    private static dislikesDao: DislikesDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikesDao => {
        if (this.dislikesDao == null) {
            this.dislikesDao = new DislikesDao();
        }
        return this.dislikesDao;
    }

    private constructor() {}

    /**
     * Uses DislikeModel to retrieve all tuits that are disliked a particular user.
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findAllTuitsDislikedByUser(uid: String): Promise<Dislike[]> {
        return DislikeModel.find({dislikedBy: uid}).populate({
            path: "tuit",
            populate: {
                path: "createdBy",
                model: "UserModel",
            }
        }).exec();
    }

    /**
     * Uses DislikeModel to retrieve all users that disliked a particular tuit.
     * @param {string} tid primary key of tuit.
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    async findAllUsersThatDislikedTuit(tid: String): Promise<Dislike[]> {
        return DislikeModel.find({tuit: tid}).populate("dislikedBy").exec();
    }

    /**
     * Uses DislikeModel to check if a user has already disliked a particular tuit.
     * @param uid User's primary key
     * @param tid Tuit's primary key
     */
    async findUserDislikesTuit(uid: String, tid: String): Promise<any> {
        return DislikeModel.findOne({tuit: tid, dislikedBy: uid});
    }

    /**
     * Uses DislikeModel to count the number of dislikes for a particular tuit.
     * @param tid Tuit's primary key
     */
    async countDislikes(tid: String): Promise<any> {
        return DislikeModel.count({tuit: tid});
    }

    /**
     * Insert dislike instance into the database.
     * @param {string} tid primary key of tuit.
     * @param {string} uid user's primary key
     * @returns Promise To be notified when the dislike is inserted in the database.
     */
    async userDislikesTuit(tid: String, uid: String): Promise<any> {
        return await DislikeModel.create({tuit: tid, dislikedBy: uid});
    }

    /**
     * Remove dislike instance from the database.
     * @param tid primary key of tuit.
     * @param uid user's primary key.
     * @returns Promise To be notified when the dislike is removed from the database.
     */
    async userUndislikesTuit(tid: String, uid: String): Promise<any> {
        return DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    }
}