import AccountType from "./AccountType";
import Location from "./Location";
import MaritalStatus from "./MaritalStatus";
import Status from "./Status";

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