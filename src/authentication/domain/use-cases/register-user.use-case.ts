import { CustomError } from "../../../shared/utils/custom.error";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { UserEntity } from "../entities/user.entity";
import { AuthRepository } from "../repository/auth.repository";

interface RegisterUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}

export class RegisterUser implements RegisterUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    // Create user
    const user = await this.authRepository.register(registerUserDto);

    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    };
  }
}
