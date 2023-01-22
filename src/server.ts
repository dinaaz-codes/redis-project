import express, {Express, Router , Request , Response} from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app:Express = express();

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`[SERVER] : started , running on ${port}`);
});