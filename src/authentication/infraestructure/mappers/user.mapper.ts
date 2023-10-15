import { UserEntity } from "../../domain/entities/user.entity";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, lastname, password, email } = object;

    return new UserEntity(_id || id, name, lastname, password, email);
  }
}
