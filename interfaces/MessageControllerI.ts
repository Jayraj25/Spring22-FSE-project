/**
 * @file Controller Interface of RESTful Web service API for messages resource
 */
import { Request, Response } from "express";

export default interface MessageControllerI {
    sendMessage (req: Request, res: Response): void;
    messageListSent (req: Request, res: Response): void;
    messageListReceived (req: Request, res: Response): void;
    getMessage (req: Request, res: Response): void;
    getAllMessages (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
}