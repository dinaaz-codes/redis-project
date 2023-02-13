import {createClient} from 'redis';

export const DEFAULT_TIME_TO_LIVE=240;

const redisClient = createClient();

redisClient.connect();

redisClient.on('connect',()=>{
    console.log('[REDIS] : connected!');
});

redisClient.on('error',(error)=>{
    console.log(`[REDIS] : error ${error}`);
});

export const setCache = async (key:string,toBeCachedValue:string,ttl:number):Promise<string>=> {
    return await redisClient.setEx(key,ttl,toBeCachedValue);
}

export const getCache = async <T>(key:string,fetcher:()=>Promise<T>):Promise<string> => {
    let exists = await redisClient.exists(key);

    if(!exists) {
            const toBeCached = await fetcher();
            await setCache(key,JSON.stringify(toBeCached),DEFAULT_TIME_TO_LIVE)
    }

    return await redisClient.get(key);
}
