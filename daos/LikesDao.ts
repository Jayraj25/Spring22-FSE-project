import LikeDaoI from "../interfaces/LikeDaoI";
import Likes from "../models/Likes";
import LikeModel from "../mongoose/LikeModel";

export default class LikesDao implements LikeDaoI {

    private static likesDao: LikesDao | null = null;

    public static getInstance = (): LikesDao => {
        if (this.likesDao == null) {
            this.likesDao = new LikesDao();
        }
        return this.likesDao;
    }

    private constructor() {}

    async findAllUsersThatLikedTuit(tid: String): Promise<Likes[]> {
        return await LikeModel.find({tuit: tid}).populate("likedBy").exec();
    }
    async findAllTuitsLikedByUser(uid: String): Promise<Likes[]> {
        return await LikeModel.find({likedBy: uid}).populate("tuit").exec();
    }
    async userLikesTuit(tid: String, uid: String): Promise<any> {
        return await LikeModel.create({tuit: tid,likedBy: uid});
    }
    async userUnlikesTuit(tid: String, uid: String): Promise<any> {
        return await LikeModel.deleteOne({tuit: tid, likedBy: uid});
    }
}