import { envs } from "../../../shared/configurations/envs";
import { JwtAdapter } from "../../../shared/configurations/jwt-adapter";
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

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
  exectue(loginUserDto: LoginUserDto): Promise<UserInfo>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async exectue(loginUserDto: LoginUserDto): Promise<UserInfo> {
    return await this.authRepository
      .login(loginUserDto)
      .then(async (user) => {
        const token = await this.signToken({ id: user.id }, envs.JWT_TIME);
        if (!token)
          throw CustomError.internalServerError("Error generating token");

        return {
          token: token,
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
