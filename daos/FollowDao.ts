import followDaoI from "../interfaces/FollowDaoI";
import followModel from "../mongoose/FollowModel";

export default class FollowDao implements followDaoI {

    private static followDao: FollowDao | null = null;

    public static getInstance = (): FollowDao => {
        if(this.followDao == null) {
            this.followDao = new FollowDao();
        }
        return this.followDao;
    }

    private constructor() {}

    async userFollowsUser(uid: String, userFollowedId: String): Promise<any> {
        return await followModel.create({userFollower: uid, userFollowing: userFollowedId});
    }
    async userUnfollowsUser(uid: String, userUnfollowedId: String): Promise<any> {
        return await followModel.deleteOne({userFollower: uid, userFollowing: userUnfollowedId});
    }
    async getFollowersList(uid: String): Promise<any> {
        return await followModel.find({userFollowing: uid}).populate("userFollower").exec();
    }
    async getFollowingList(uid: String): Promise<any> {
        return await followModel.find({userFollower: uid}).populate("userFollowing").exec();
    }
    async getFollowerFollowing(fid: string): Promise<any> {
        return await followModel.findById(fid).populate("userFollower").populate("userFollowing").exec();
    }
    
}