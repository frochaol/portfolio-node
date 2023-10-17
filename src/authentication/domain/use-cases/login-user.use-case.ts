import { LoginUserDto } from "../dtos/login-user.dto";
import { AuthRepository } from "../repository/auth.repository";

interface UserInfo {
  token: string;
  user: {
    id: string;
    name: string;
    lastname: string;
    email: string;
  };
}

interface LoginUserUseCase {
  exectue(loginUserDto: LoginUserDto): Promise<UserInfo>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async exectue(loginUserDto: LoginUserDto): Promise<UserInfo> {
    const user = await this.authRepository.login(loginUserDto);

    return {
      token: "",
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
    };
  }
}
