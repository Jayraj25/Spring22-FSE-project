/**
 * @file Implements DAO managing data storage of pollResponses. Uses mongoose PollResponseModel
 * to integrate with MongoDB
 */
import PollResponse from "../models/PollResponse";
import Poll from "../models/Poll";
import PollResponseDaoI from "../interfaces/PollResponseDaoI";
import PollResponseModel from "../mongoose/PollResponseModel";
import PollModel from "../mongoose/PollModel";
import {json} from "express";

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


    async isPollClosed(pid:string): Promise<boolean> {
        let isPollClosed = null;
        await PollModel.findById(pid).then(poll=> {
            if (poll != null){
                isPollClosed = poll.closed;
                }
        }).catch((e)=>{console.log(e)})
        // @ts-ignore
        return isPollClosed;
    }
    /**
     * Inserts pollResponse instance into the database.
     * @param {string} uid User's primary key
     * @param {string} pid Poll's primary key
     * @param {PollResponse} pollResponse Instance to be inserted in the database.
     * @returns Promise To be notified when the pollResponse is inserted in the database
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
        //return PollResponseModel.find({respondedBy: uid}).populate("respondedBy").exec();
        return PollResponseModel.find({respondedBy: uid});
    }

    /**
     * Uses PollResponseModel to retrieve pollResponse documents by id from pollResponses collections.
     * @param {string} pid Poll's primary key
     * @returns Promise To be notified when the pollResponses are retrieved from
     * database
     */
    async findAllUsersReplyByPollId(pid: string): Promise<any> {
        //return await PollResponseModel.find({pollId: pid}).populate("respondedBy").exec();
        return await PollResponseModel.find({pollId: pid});
    }

    /**
     * Updates pollResponses with new values in the database.
     * @param {string} uid primary key of user ID
     * @param {string} pid primary key of pollResponse to be updated.
     * @param {PollResponse} pollResponse PollResponse object containing properties and their new values.
     * @returns Promise To be notified when pollResponse is updated in the database
     */
    async updatePollResponse(uid: string ,pid: string ,pollResponse: PollResponse): Promise<any> {
        // console.log(pollResponse)

        return PollResponseModel.updateOne({pollId: pid, respondedBy: uid}, {$set: pollResponse});
    }

    /**
     * Removes pollResponse from the database.
     * @param {string} pid Primary key of poll that is to be deleted from the database.
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when pollResponse is removed from the database
     */
    async deletePollResponse(pid: string, uid: string): Promise<any> {
        return PollResponseModel.deleteOne({pollId: pid, respondedBy:uid});
    }


    /**
     * Uses PollResponseModel to retrieve all pollResponses documents from pollResponses collections.
     * @param {string} pid Poll's primary key
     * @returns Promise To be notified when the pollResponses are retrieved from
     * database
     */
    async findPollResponseByPollId(pid: string): Promise<any> {
        //return await PollResponseModel.find({pollId:pid}).populate("respondedBy").exec();
        return await PollResponseModel.find({pollId:pid});
    }

    /**
     * Uses PollResponseModel to retrieve a pollResponses documents from pollResponses collections.
     * @param {string} pid Poll's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the pollResponses are retrieved from
     * database
     */
    async findPollResponseByPollIdByUserId(uid:string, pid: string): Promise<any> {
        return await PollResponseModel.findOne({pollId:pid, respondedBy:uid});
    }
}

