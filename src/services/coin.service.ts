import axios from 'axios';

const getCryptoCoinExternalApi = ():string => {
    return process.env.COIN_GEKO_API ?? 'https://pro-api.coingecko.com/api/v3';
}

const isExternalCoinsApiActive = async () : Promise<boolean>  => {
    try{
        const url:string = `${getCryptoCoinExternalApi()}/ping`;
        const response = await axios.get(url);
        
        return response.status == 200 ? true : false;
    }catch(error){
        throw error;
    }
}

const getCoinById =  async (tokenId:string): Promise<Coin> => {
    try{
        const url:string = `${getCryptoCoinExternalApi()}/coins/${tokenId}`;

        const response = await axios.get(url);

        return {
            id:response.data.id,
            name:response.data.name,
            symbol:response.data.symbol,
        }
    }catch(error){
        throw error;
    }
} 

export {
    isExternalCoinsApiActive,
    getCoinById
}