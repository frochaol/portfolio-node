import { Request, Response } from "express";
import { RegisterUserDto } from "../domain/dtos/register-user.dto";
import { AuthRepository } from "../domain/repository/auth.repository";
import { RegisterUser } from "../domain/use-cases/register-user.use-case";
import { CustomError } from "../../shared/utils/custom.error";
import { LoginUserDto } from "../domain/dtos/login-user.dto";
import { LoginUser } from "../domain/use-cases/login-user.use-case";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  //@desc Login user
  //@route POST /api/auth/login
  //@access public
  loginUser = (req: Request, res: Response) => {
    try {
      const [error, loginUserDto] = LoginUserDto.login(req.body);
      if (error) throw CustomError.badRequest(error);

      new LoginUser(this.authRepository)
        .exectue(loginUserDto!)
        .then((data) => res.json(data))
        .catch((error) => CustomError.handleError(error, res));
    } catch (error) {
      throw CustomError.handleError(error, res);
    }
  };

  //@desc Register user
  //@route POST /api/auth/register
  //@access public
  registerUser = (req: Request, res: Response) => {
    try {
      const [error, registerUserDto] = RegisterUserDto.create(req.body);
      // Validation of request object
      if (error) throw CustomError.badRequest(error);

      new RegisterUser(this.authRepository)
        .execute(registerUserDto!)
        .then((data) => res.json(data))
        .catch((error) => CustomError.handleError(error, res));
    } catch (error) {
      throw CustomError.handleError(error, res);
    }
  };
}
