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



}
