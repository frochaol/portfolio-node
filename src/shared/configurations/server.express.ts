import express, { Router } from "express";

interface Options {
  port?: number;
  routes: Router;
}

export class ServerExpress {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middleware configuration
    this.app.use(express.json()); // can receive json request
    this.app.use(express.urlencoded({ extended: true })); // can receive x-www-encoded request
    // Full Routes
    this.app.use(this.routes);
    // Server configuration
    this.app.listen(this.port, () => {
      try {
        console.log(`Server running at Port ${this.port}`);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
