import { Router } from "express";
import { AuthController } from "./auth-controller";
import { AuthDataSourceImplementation } from "../infraestructure/datasources/auth.datasource.impl";
import { AuthRepositoryImplementation } from "../infraestructure/repositories/auth.repository.impl";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new AuthDataSourceImplementation();
    const authRepository = new AuthRepositoryImplementation(datasource);
    const controller = new AuthController(authRepository);

    // Define main routes for authentication module
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    return router;
  }
}
