/**
 * @file Implements mongoose schema for users.
 */
import mongoose from "mongoose";
import User from "../models/User";

/**
 * @
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
const UserSchema = new mongoose.Schema<User>({
   username: {type: String, required: true},
   password: {type: String, required: true},
   firstName: String,
   lastName: String,
   email: {type: String, required: true},
   profilePhoto: String,
   headerImage: String,
   accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
   maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
   biography: String,
   dateOfBirth: Date,
   joined: {type: Date, default: Date.now},
   location: {latitude: Number, longitude: Number},
   status: {type: String, default: 'OFFLINE', enum: ['OFFLINE','ACTIVE']}
}, {collection: 'users'});

export default UserSchema;