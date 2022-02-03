import { Request, Response, Express } from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";
import User from "../models/User";

export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;
    
    private constructor() {}

    public static getInstance = (app: Express): UserController => {
        if(UserController.userController == null) {
            UserController.userController = new UserController();
            app.get("/api/users", UserController.userController.findAllUsers);
            app.get("/api/users/:uid", UserController.userController.findUserById);
            app.post("/api/users", UserController.userController.createUser);
            app.put("/api/users/:uid", UserController.userController.updateUser);
            app.delete("/api/users/:uid", UserController.userController.deleteUser);
        }
        return UserController.userController;
    }
    
    findAllUsers = (req: Request, res: Response) => 
        UserController.userDao.findAllUsers().then((users:User[]) => res.json(users));
    findUserById = (req: Request, res: Response) => 
        UserController.userDao.findUserById(req.params.uid).then((users:User) => res.json(users));
    createUser = (req: Request, res: Response) => 
        UserController.userDao.createUser(req.body).then(user => res.json(user));
    deleteUser = (req: Request, res: Response) => 
        UserController.userDao.deleteUser(req.params.uid).then(status => res.json(status));
    updateUser = (req: Request, res: Response) => 
        UserController.userDao.updateUser(req.params.uid, req.body).then(status => res.json(status));
}