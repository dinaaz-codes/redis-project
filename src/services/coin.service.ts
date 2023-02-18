import axios from "axios";
import { URLSearchParams } from "url";
import { getConstant } from "../config/constants";

const getCryptoCoinExternalApi = (): string => {
  return getConstant("COIN_GEKO_API");
};

const isExternalCoinsApiActive = async (): Promise<boolean> => {
  try {
    const url: string = `${getCryptoCoinExternalApi()}/ping`;
    const response = await axios.get(url);

    return response.status == 200 ? true : false;
  } catch (error) {
    throw error;
  }
};

const getCoinById = async (tokenId: string): Promise<Coin> => {
  try {
    const queryParams = new URLSearchParams({
      localization: "false",
      tickers: "false",
      community_data: "false",
      developer_data: "false",
      sparkline: "false",
    });

    const url: string = `${getCryptoCoinExternalApi()}/coins/${tokenId}?${queryParams.toString()}`;

    const response = await axios.get(url);

    return {
      id: response?.data?.id,
      name: response?.data?.name,
      symbol: response?.data?.symbol,
      currentPrice: {
        inr: response?.data?.market_data?.current_price?.inr,
        usd: response?.data?.market_data?.current_price?.usd,
      },
    };
  } catch (error) {
    throw error;
  }
};

export { isExternalCoinsApiActive, getCoinById };
