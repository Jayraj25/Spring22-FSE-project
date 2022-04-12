/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follow</li>
 *     <li>bookmark</li>
 *     <li>message</li>
 *     <li>polls</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import LikesController from './controllers/LikesController';
import FollowController from './controllers/FollowController';
import BookmarkController from './controllers/BookmarkController';
import MessageController from './controllers/MessageController';
import AuthenticationController from "./controllers/AuthenticationController";
import DislikesController from "./controllers/DislikesController";
import PollController from "./controllers/PollController";

require("dotenv").config({ path: "./.env"});
// console.log(process.env.DB_PASSWORD);
console.log("Up and running....");

// connect to the database
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

const session = require("express-session");
const cors = require('cors')
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
    // origin: 'https://quizzical-mcclintock-e40782.netlify.app'
}));

let sess = {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: false
    }
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy',1) // trust first proxy
    sess.cookie.secure = true // server secure cookies
}

app.use(session(sess))
app.use(bodyParser.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikesController.getInstance(app);
const dislikeController = DislikesController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const pollController = PollController.getInstance(app);
AuthenticationController(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);