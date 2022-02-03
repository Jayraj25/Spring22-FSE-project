import { Request, Response, Express } from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";
import TuitModel from "../mongoose/TuitModel";

export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits',this.findAllTuits);
        this.app.get('/tuits/:id',this.findTuitById);
        this.app.get('/users/:uid/tuits',this.findTuitsByUser);
        this.app.post('/tuits',this.createTuit);
        this.app.delete('/tuits/:id', this.deleteTuit);
        this.app.put('/tuits/:id',this.updateTuit);
    }

    findAllTuits = (req: Request, res: Response) => this.tuitDao.findAllTuits().then(tuits => res.json(tuits));
    findTuitById = (req: Request, res: Response) => this.tuitDao.findTuitById(req.params.id).then(tuits => res.json(tuits));
    findTuitsByUser = (req: Request, res: Response) => this.tuitDao.findTuitById(req.params.id).then(tuits => res.json(tuits));
    createTuit = (req: Request, res: Response) => this.tuitDao.createTuit(req.body).then(tuits => res.json(tuits));
    deleteTuit = (req: Request, res: Response) => this.tuitDao.deleteTuit(req.params.id).then(status => res.json(status));
    updateTuit = (req: Request, res: Response) => this.tuitDao.updateTuit(req.params.id,req.body).then(status => res.json(status));
}