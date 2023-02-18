import express, { Express } from "express";
import router from "./routes";
import { getConstant, validateEnvVar } from "./config/constants";

const app: Express = express();

app.use(router);

validateEnvVar();

const port = getConstant("PORT") || 3000;

app.listen(port, () => {
  console.log(`[SERVER] : started , running on ${port}`);
});
