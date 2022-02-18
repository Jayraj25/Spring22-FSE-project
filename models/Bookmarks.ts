import Tuit from "./Tuit";
import User from "./User";

export default interface Bookmarks {
    bookmarkedTuit: Tuit;
    bookmarkedBy: User;
}