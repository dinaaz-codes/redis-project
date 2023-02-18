import dotenv from "dotenv";
dotenv.config();

const ENV_VAR = [
  {
    key: "PORT",
    value: process.env.PORT,
  },
  {
    key: "REDIS_URL",
    value: process.env.REDIS_CACHE_URL,
  },
  {
    key: "COIN_GEKO_API",
    value: process.env.COIN_GEKO_API,
  },
] as const;

type EnvironmentVariables = typeof ENV_VAR[number]["key"];

export const getConstant = (key: EnvironmentVariables): string => {
  return ENV_VAR.find((constant) => constant.key == key).value;
};

export const validateEnvVar = () => {
  const notSetEnvVars = ENV_VAR.filter(
    (envVar) => !envVar.value || envVar.value === ""
  );

  const errorMessages = notSetEnvVars.map(
    (element) => `${element.key} env not set`
  );

  if (notSetEnvVars.length > 0)
    throw new Error(`[CONSTANTS] : ${errorMessages.toString()}`);
};
