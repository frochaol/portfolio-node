import { CustomError } from "../../../shared/utils/custom.error";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { AuthRepository } from "../repository/auth.repository";

interface UserRegistration {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

interface RegisterUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserRegistration>;
}

export class RegisterUser implements RegisterUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserRegistration> {
    // Create user
    return await this.authRepository
      .register(registerUserDto)
      .then((user) => {
        return {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
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
