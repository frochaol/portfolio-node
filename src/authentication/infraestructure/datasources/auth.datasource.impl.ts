import { error } from "console";
import { UserModel } from "../../../shared/data/mongodb/models/user.model";
import { CustomError } from "../../../shared/utils/custom.error";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { BcryptAdapter } from "../../../shared/configurations/bcrypt";

// Add a tpe to do not depend on another layer
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImplementation implements AuthDatasource {
  constructor(
    private readonly hasPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.badRequest("Bad Credentials");

      const isMatching = this.comparePassword(password, user.password);
      if (!isMatching) throw CustomError.badRequest("Password is not valid");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password, lastname } = registerUserDto;

    try {
      const emailExist = await UserModel.findOne({ email: email });
      if (emailExist) throw CustomError.badRequest("User Email already exists");

      const user = await UserModel.create({
        name: name,
        lastname: lastname,
        email: email,
        password: this.hasPassword(password),
      });
      await user.save();
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }
}
