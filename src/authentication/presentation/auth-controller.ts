import { Request, Response } from "express";

export class AuthController {
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
    return res.status(200).json({ body: "Register Works!" });
  };
}
