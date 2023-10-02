import { envs } from "./shared/configurations/envs";
import { AppRoutes } from "./shared/configurations/routes";
import { Server } from "./shared/configurations/server.express";

// make main an async function with an anonymous self-invoking function
(() => {
  main();
})();

async function main() {
  // BD Configuration
  // Server iniciation/configuration
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
