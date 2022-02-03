import Tuit from "../models/Tuit";
import UserModel from "../mongoose/UserModel";
import TuitDaoI from "../interfaces/TuitDaoI";
import TuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({createdBy: UserModel.findById(uid)});
    }
    async findTuitById(tid: string): Promise<Tuit> {
        return await TuitModel.findById(tid);
    }
    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid},{$set: tuit});
    }
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
    
}