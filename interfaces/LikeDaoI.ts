/**
 * @file Declares DAO interface managing Data Storage Access for likes.
 */
import Likes from "../models/Likes";

export default interface LikeDaoI {
    findAllUsersThatLikedTuit (tid: String): Promise<Likes[]>;
    findAllTuitsLikedByUser (uid: String): Promise<Likes[]>;
    userLikesTuit (tid: String, uid: String): Promise<any>;
    userUnlikesTuit (tid: String, uid: String): Promise<any>;
}