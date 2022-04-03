/**
 * @file Controller Interface of RESTful Web service API for dislikes resource
 */
import { Request, Response } from "express";

export default interface DislikeControllerI {
    findAllUsersThatDislikedTuit(req: Request, res: Response): void;
    findAllTuitsDislikedByUser(req: Request, res: Response): void;
    userDislikesTuit(req: Request, res: Response): void;
    userUnDislikesTuit(req: Request, res: Response): void;
}