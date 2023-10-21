import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),
  JWT_TIME: get("JWT_TIME").required().asString(),
};
