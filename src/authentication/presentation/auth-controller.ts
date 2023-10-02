import { Request, Response } from "express";

export class AuthController {
  loginUser = (req: Request, res: Response) => {
    return res.status(200).json({ body: "Login Works!" });
  };

  registerUser = (req: Request, res: Response) => {
    return res.status(200).json({ body: "Register Works!" });
  };
}
