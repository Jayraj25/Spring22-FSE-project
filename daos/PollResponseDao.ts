/**
 * @file Implements DAO managing data storage of pollResponses. Uses mongoose PollResponseModel
 * to integrate with MongoDB
 */
import PollResponse from "../models/PollResponse";
import PollResponseDaoI from "../interfaces/PollResponseDaoI";
import PollResponseModel from "../mongoose/PollResponseModel";

/**
 * @class PollResponseDao Implements Data Access Object managing data storage
 * of PollResponses
 * @property {PollResponseDao} pollResponseDao Private single instance of PollResponseDao
 */
export default class PollResponseDao implements PollResponseDaoI {

    private static pollResponseDao: PollResponseDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns PollResponseDao
     */
    public static getInstance = (): PollResponseDao => {
        if(PollResponseDao.pollResponseDao === null) {
            PollResponseDao.pollResponseDao = new PollResponseDao();
        }
        return PollResponseDao.pollResponseDao;
    }

    private constructor() {}

    /**
     * Inserts pollResponse instance into the database.
     * @param {string} uid User's primary key
     * @param {PollResponse} pollResponse Instance to be inserted in the database.
     * @returns Promise To be notified when the pollResponse is inserted in the database.
     */
    async createPollResponse(uid: string, pid:string, pollResponse: PollResponse): Promise<PollResponse> {
        //console.log(pollResponse);
        return await PollResponseModel.create({...pollResponse, respondedBy: uid, pollId:pid});
    }


    /**
     * Uses PollResponseModel to retrieve all pollResponses documents by a particular user from pollResponses collections.
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the pollResponses are retrieved from
     * database
     */
    async findPollResponsesByUser(uid: string): Promise<PollResponse[]> {
        return PollResponseModel.find({respondedBy: uid}).populate("respondedBy").exec();
    }

    /**
     * Uses PollResponseModel to retrieve pollResponse documents by id from pollResponses collections.
     * @param {string} pid PollResponses' primary key
     * @returns Promise To be notified when the pollResponses are retrieved from
     * database
     */
    async findAllUsersReplyPollResponse(pid: string): Promise<any> {
        return await PollResponseModel.findById(pid).populate("respondedBy").exec();
    }

    /**
     * Updates pollResponses with new values in the database.
     * @param {string} uid primary key of user ID
     * @param {string} pid primary key of pollResponse to be updated.
     * @param {PollResponse} pollResponse PollResponse object containing properties and their new values.
     * @returns Promise To be notified when pollResponse is updated in the database
     */
    async updatePollResponse(uid: string ,pid: string ,pollResponse: PollResponse): Promise<any> {
        return PollResponseModel.updateOne({_id: pid, respondedBy: uid}, {$set: pollResponse});
    }

    /**
     * Removes pollResponse from the database.
     * @param {string} tid Primary key of pollResponse that is to be deleted from the database.
     * @returns Promise To be notified when pollResponse is removed from the database
     */
    async deletePollResponse(pid: string, uid: string): Promise<any> {
        return PollResponseModel.deleteOne({_id: pid, respondedBy:uid});
    }


}
