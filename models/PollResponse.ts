/**
 * @file Declares poll response data type representing relationship between
 * poll, poll response and user responded
 */
import User from "./User";
import Poll from "./Poll";

/**
 * @typedef PollResponse Represents responses relationship between a poll and user
 * @property {Poll} pollId poll for which the response is being recorded
 * @property {User} respondedBy User responding to the poll
 */
export default interface PollResponse {
    pollId: Poll,
    respondedBy: User,
    chosenOption: Number

};