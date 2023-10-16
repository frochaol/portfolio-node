import { Request, Response } from "express";
import { RegisterUserDto } from "../domain/dtos/register-user.dto";
import { AuthRepository } from "../domain/repository/auth.repository";
import { RegisterUser } from "../domain/use-cases/register-user.use-case";
import { CustomError } from "../../shared/utils/custom.error";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  //@desc Login user
  //@route POST /api/auth/login
  //@access public
  loginUser = (req: Request, res: Response) => {
    return res.status(200).json({ body: "Login Works!" });
  };

  //@desc Register user
  //@route POST /api/auth/register
  //@access public
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) throw CustomError.badRequest(error);

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => CustomError.handleError(error, res));
  };
}
