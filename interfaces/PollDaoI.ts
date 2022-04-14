/**
 * @file Declares DAO interface managing Data Storage Access for polls.
 */

import Poll from "../models/Poll";

export default interface PollDaoI {
    createPoll(uid: string, poll: Poll): Promise<Poll>;
    getAllPolls(): Promise<Poll[]>;
    getPollById(id: string): Promise<Poll>;
}