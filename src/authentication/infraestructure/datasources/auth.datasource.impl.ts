import { error } from "console";
import { UserModel } from "../../../shared/data/mongodb/models/user.model";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { RegisterUserDto } from "../../domain/dtos/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";

export class AuthDataSourceImplementation implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password, lastname } = registerUserDto;

    try {
      const emailExist = await UserModel.findOne({ email: email });
      if (emailExist) throw new Error("Email Exist");
      const user = await UserModel.create({
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      });
      await user.save();
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      throw error;
    }
  }
}
