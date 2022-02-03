import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import UserController from './controllers/UserController';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tuiter');

const app = express();
app.use(bodyParser.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);

const PORT = 4000;

app.listen(process.env.PORT || PORT);