import { UserModel } from "../../../shared/data/mongodb/models/user.model";
import { CustomError } from "../../../shared/utils/custom.error";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";

export class AuthDataSourceImplementation implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password, lastname } = registerUserDto;

    try {
      const emailExist = await UserModel.findOne({ email: email });
      if (emailExist) throw CustomError.badRequest("Bad Credentials");
      const user = await UserModel.create({
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      });
      await user.save();
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      throw CustomError.internalServerError();
    }
  }
}
