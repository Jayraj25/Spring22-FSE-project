import User from "./User";

export default interface Follow {
    userFollower: User;
    userFollowing: User;
}