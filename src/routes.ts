import express , {Router, Request , Response} from 'express';
import * as coinController from './controllers/coin.controller';
const router: Router = express.Router();

const getRoutePrefix= () => '/api/v1';

router.get(`${getRoutePrefix()}/coin/:id`,coinController.getCoinDetails);

router.all(`${getRoutePrefix()}/*`,(req:Request,res:Response) => {
    res.status(200).json({'message': 'hello redis!'});
})

export default router;