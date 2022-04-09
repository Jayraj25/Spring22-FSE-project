/**
 * @file Controller Interface of RESTful Web service API for pollResponse resource
 */
import { Request, Response } from "express";

export default interface PollResponseControllerI {
    createPollResponse(req: Request, res: Response): void;
    findPollResponsesByUser(req: Request, res: Response): void;
    findAllUsersReplyPollResponse(req: Request, res: Response): void;
    updatePollResponse(req: Request, res: Response): void;
    deletePollResponse(req: Request, res: Response): void;
}