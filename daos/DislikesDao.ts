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
 * @property {DislikesDao} dislikeDao Private single instance of LikeDao
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

    //find all tuits disliked by user
    async findAllTuitsDislikedByUser(uid: String): Promise<Dislike[]> {
        return DislikeModel.find({dislikedBy: uid}).populate({
            path: "tuit",
            populate: {
                path: "createdBy",
                model: "UserModel",
            }
        }).exec();
    }

    //find all users that disliked a particular tuit
    async findAllUsersThatDislikedTuit(tid: String): Promise<Dislike[]> {
        return DislikeModel.find({tuit: tid}).populate("dislikedBy").exec();
    }

    //find user dislikes tuits
    async findUserDislikesTuit(uid: String, tid: String): Promise<any> {
        return DislikeModel.findOne({tuit: tid, dislikedBy: uid});
    }

    //count number of disliked tuits
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