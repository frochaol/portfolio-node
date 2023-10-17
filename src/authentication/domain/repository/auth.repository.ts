import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
