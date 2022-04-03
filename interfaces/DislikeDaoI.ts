/**
 * @file Declares DAO interface managing Data Storage Access for dislikes.
 */
import {Dislike} from "../models/Dislikes";

export default interface DislikeDaoI {
    findAllUsersThatDislikedTuit(tuitId: String): Promise<Dislike[]>;
    findAllTuitsDislikedByUser(userId: String): Promise<Dislike[]>;
    userDislikesTuit(userId: String, tuitId: String): Promise<any>;
    userUndislikesTuit(userId: String, tuitId: String): Promise<any>;
}