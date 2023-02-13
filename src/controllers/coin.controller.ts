import { Request,Response } from "express";
import { getCache } from "../services/cache.service";
import { getCoinById } from "../services/coin.service";

export const getCoinDetails = async (req:Request , res : Response) : Promise<any> => {
    try{

        const coinId:string = req.params.id;

        console.time("Execution Time");
        const coinData = await getCache<Coin>(coinId,()=>{return getCoinById(coinId)});
        console.timeEnd("Execution Time");

        return res.status(200).json(JSON.parse(coinData));
       
    }catch(error : any){
        console.log(error);
        res.status(500).json({message:"Something went wrong!"});
    }
}
