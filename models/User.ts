/**
 * @file User data model.
 */
import AccountType from "./AccountType";
import Location from "./Location";
import MaritalStatus from "./MaritalStatus";
import Status from "./Status";

/**
 * @typedef User Represents users using tuiter app.
 * @property {string} username tuiter's username
 * @property {string} password tuiter's password of the user
 * @property {string} firstName the user's first name.
 * @property {string} lastName the user's last name.
 * @property {string} email the user's email id.
 * @property {string} profilePhoto the user's profile pic.
 * @property {string} headerImage the user's header image.
 * @property {AccountType} accountType the user's accountType.
 * @property {MaritalStatus} maritalStatus the user's email id.
 * @property {string} biography the user's biography.
 * @property {Date} dateOfBirth the user's DOB.
 * @property {Date} joined the user's date of joining.
 * @property {string} location the user's location.
 * @property {status} Status the user's status on tuiter.
 */
export default interface User {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email: string;
    profilePhoto?: string;
    headerImage?: string;
    accountType?: AccountType;
    maritalStatus?: MaritalStatus;
    biography?: string;
    dateOfBirth?: Date;
    joined?: Date;
    location?: Location;
    status?: Status;
};