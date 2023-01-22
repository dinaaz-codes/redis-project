import { Request,Response } from "express";
import { getCoinById } from "../services/coin.service";

export const getCoinDetails = async (req:Request , res : Response) : Promise<any> => {
    try{
        const coinId:string = req.params.id;

        const coinData = await getCoinById(coinId);

        return res.status(200).json(coinData);
    
    }catch(error : any){
        res.status(500).json({message:"Something went wrong!"});
    }
}
