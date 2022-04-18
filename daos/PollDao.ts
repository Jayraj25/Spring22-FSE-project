import PollDaoI from "../interfaces/PollDaoI";
import Poll from "../models/Poll";
import PollModel from "../mongoose/PollModel";



export default class PollDao implements PollDaoI {
    private static pollDao: PollDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns PollDao
     */
    public static getInstance = (): PollDao => {
        if(PollDao.pollDao === null) {
            PollDao.pollDao = new PollDao();
        }
        return PollDao.pollDao;
    }

    private constructor() {}

    /**
     * Inserts polls instance into the database.
     * @param {string} uid User's primary key
     * @param {Poll} poll Instance to be inserted in the database.
     * @returns Promise To be notified when the poll is inserted in the database.
     */
    async createPoll(uid: string, poll: Poll): Promise<Poll> {
        return await PollModel.create({...poll, createdBy: uid});
    }

    /**
     * Finds all polls.
     * @returns Promise To be notified when the polls are found.
     */
    async getAllPolls(): Promise<Poll[]> {
        return PollModel.find();
    }

    /**
     * Finds a poll by its primary key.
     * @param {string} id Poll's primary key
     * @returns Promise To be notified when the poll is found.
     */
    async getPollById(id: string): Promise<any> {
        return PollModel.findById(id);
    }


    /**
     * Deletes a poll by its primary key
     * @param {string} pid poll's primary key
     * @returns Promise To be notified regarding the status of the operation
     */
    async deletePoll(pid: string): Promise<any> {
        return PollModel.deleteOne({_id: pid});
    }


    /**
     * Closes a poll by its primary key
     * @param {string} pid poll's primary key
     * @returns Promise To be notified regarding the status of the operation
     */
    async closePoll(pid: string): Promise<any> {
        return PollModel.updateOne({_id: pid}, {$set: {closed: true}});
    }


}
