import { CustomError } from "../../../shared/utils/custom.error";
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
    // Login User

    return await this.authRepository
      .login(loginUserDto)
      .then((user) => {
        return {
          token: "",
          user: {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
          },
        };
      })
      .catch((error) => {
        if (error instanceof CustomError) {
          throw error;
        }
        throw CustomError.internalServerError();
      });
  }
}
