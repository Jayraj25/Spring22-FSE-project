import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";
import TuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {

    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({createdBy: uid});
    }
    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid).populate("createdBy").exec();
    }
    async createTuit(uid: string, tuit: Tuit): Promise<Tuit> {
        console.log(tuit);
        return await TuitModel.create({...tuit, createdBy: uid});
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid},{$set: tuit});
    }
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
    
}
