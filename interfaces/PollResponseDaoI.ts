/**
 * @file Declares DAO interface managing Data Storage Access for tuits.
 */
import PollResponse from "../models/PollResponse";

export default interface PollResponseDaoI {

   createPollResponse(uid:string, pid: string, pollResponse: PollResponse): Promise<PollResponse>;
   findPollResponsesByUser(uid: string): Promise<PollResponse[]>;
   findAllUsersReplyPollResponse(pid: string): Promise<PollResponse>;
   updatePollResponse( uid: string ,pid: string ,pollResponse: PollResponse): Promise<any>;
   deletePollResponse(pid: string, uid: string): Promise<any>;

}
