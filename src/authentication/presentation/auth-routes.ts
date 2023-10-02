import { Router } from "express";
import { AuthController } from "./auth-controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthController();

    // Define main routes for authentication module
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    return router;
  }
}
