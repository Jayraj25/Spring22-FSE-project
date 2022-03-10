/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";
import TuitModel from "../mongoose/TuitModel";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {

    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuits documents from tuits collections.
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find().populate("createdBy").exec();
    }

    /**
     * Uses TuitModel to retrieve all tuits documents by a particular user from tuits collections.
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({createdBy: uid});
    }

    /**
     * Uses TuitModel to retrieve tuit documents by id from tuits collections.
     * @param {string} tid Tuits' primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid).populate("createdBy").exec();
    }

    /**
     * Inserts tuit instance into the database.
     * @param {string} uid User's primary key
     * @param {Tuit} tuit Instance to be inserted in the database.
     * @returns Promise To be notified when the tuit is inserted in the database.
     */
    async createTuit(uid: string, tuit: Tuit): Promise<Tuit> {
        console.log(tuit);
        return await TuitModel.create({...tuit, createdBy: uid});
    }

    /**
     * Updates tuits with new values in the database.
     * @param {string} tid primary key of tuit to be updated.
     * @param {Tuit} tuit Tuit object containing properties and their new values.
     * @returns Promise To be notified when tuit is updated in the database
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid},{$set: tuit});
    }

    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit that is to be deleted from the database.
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }

    /**
     * Removes tuit from the database.
     * @param {string} content tuit that is to be deleted from the database.
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuitByContent(content: string): Promise<any> {
        return await TuitModel.deleteOne({tuit: {$regex: content}});
    }
}
