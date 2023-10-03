import { envs } from "./shared/configurations/envs";
import { AppRoutes } from "./shared/configurations/routes";
import { ServerExpress } from "./shared/configurations/server.express";
import { MongoDatabase } from "./shared/data/mongodb/mongo-database";

// make main an async function with an anonymous self-invoking function
(() => {
  main();
})();

async function main() {
  // BD Configuration
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    dbUrl: envs.MONGO_URL,
  });

  // Server iniciation/configuration
  new ServerExpress({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
