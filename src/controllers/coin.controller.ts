import { Request, Response } from "express";
import { getCache, setCache } from "../services/cache.service";
import { getCoinById } from "../services/coin.service";

export const getCoinDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const coinId: string = req.params.id;

    console.time("Execution Time");
    let coinData = await getCache<Coin>(coinId);

    if (!coinData) {
      coinData = await getCoinById(coinId);
      setCache(coinData.id, coinData);
    }
    console.timeEnd("Execution Time");

    return res.status(200).json(coinData);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
