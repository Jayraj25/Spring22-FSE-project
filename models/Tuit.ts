import User from "./User";

export default interface Tuit {
    tuit: string;
    postedOn?: Date;
    createdBy: User;
}