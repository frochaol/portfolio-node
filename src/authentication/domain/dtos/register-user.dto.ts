import { CustomError } from "../../../shared/utils/custom.error";
import { Validators } from "../../../shared/utils/validators.util";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public lastname: string,
    public password: string,
    public email: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, lastname, password, email } = object;
    if (!name) return ["Missing name", undefined];
    if (!email) return ["Missing email", undefined];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password", undefined];
    if (password.length < 8) return ["Password too short"];

    return [
      undefined,
      new RegisterUserDto(name, lastname, password, email.toLowerCase()),
    ];
  }
}
