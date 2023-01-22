import express , {Router, Request , Response} from 'express';

const router: Router = express.Router();


router.all('/api/v1/*',(req:Request,res:Response) => {
    res.status(200).json({'message': 'hello redis!'});
})

export default router;