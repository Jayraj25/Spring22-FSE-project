import UserDao from "../daos/UserDao";
import {Express, Request, Response} from "express";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const AuthenticationController = (app: Express) => {
    const userDao = UserDao.getInstance();

    const login = async (req: Request, res: Response) => {
        const {username, password} = req.body;
        const user = await userDao.findUserByUsername(username);
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                user.password = "******";
                // @ts-ignore
                req.session["profile"] = user;
                res.status(200).json({
                    message: "Login successful",
                    user: user
                });
            } else {
                res.status(401).json({
                    message: "Invalid password"
                });
            }
        } else {
            res.status(401).json({
                message: "User not found"
            });
        }
    };

    const signUp = async (req: Request,res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        newUser.password = await bcrypt.hash(password, saltRounds);
        const existingUser = await userDao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        }
        else {
            const insertedUser = await userDao.createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session["profile"] = insertedUser;
            res.json(insertedUser);
        }
    }

    const profile = async (req: Request, res: Response) => {
        // @ts-ignore
        const user = req.session["profile"];
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(401);
        }
    };

    const logout = (req: Request, res: Response) => {
        //
        req.session.destroy((err) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    };

    app.post("/api/auth/login", login);
    app.post("/api/auth/register", signUp);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
}
export default AuthenticationController;