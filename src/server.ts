import express, {Express, Router , Request , Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app:Express = express();

const router : Router = express.Router()

router.use('/',(req:Request ,res:Response ) => {
    res.send('hello redis!')
})

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`[SERVER] : started , running on ${port}`);
});