import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import LikesController from './controllers/LikesController';
import FollowController from './controllers/FollowController';
import BookmarkController from './controllers/BookmarkController';

require("dotenv").config({ path: "./variables.env"});
// console.log(process.env.DB_PASSWORD);
console.log("Up and running....");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fsemongodb:' + process.env.DB_PASSWORD + '@cluster0.h9vbo.mongodb.net/Tuiter?retryWrites=true&w=majority');

const app = express();
app.use(bodyParser.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikesController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);

const PORT = 4000;

app.listen(process.env.PORT || PORT);
