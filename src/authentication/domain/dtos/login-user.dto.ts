import { Validators } from "../../../shared/utils/validators.util";

export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static login(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;
    if (!email) return ["Missing email", undefined];
    if (!Validators.email.test(email)) return ["Email is not valid"];

    return [undefined, new LoginUserDto(email.toLowerCase(), password)];
  }
}
