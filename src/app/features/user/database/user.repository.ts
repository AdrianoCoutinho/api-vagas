import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Typeruser, User } from "../../../models/user.model";
import { UserEntity } from "../../../shared/database/entities/user.entity";

export class UserRepository {
  private repository = TypeormConnection.connection.getRepository(UserEntity);

  public async getByUsername(
    username: string,
    password?: string
  ): Promise<User | null> {
    const result = await this.repository.findOneBy({
      username,
      password,
    });

    if (!result) {
      return null;
    }

    return UserRepository.mapEntityToModel(result);
  }

  public async get(id: string): Promise<User | null> {
    const result = await this.repository.findOneBy({
      id,
    });

    if (!result) {
      return null;
    }

    return UserRepository.mapEntityToModel(result);
  }

  public async create(user: User) {
    const userEntity = this.repository.create({
      id: user.id,
      name: user.name,
      username: user.username,
      nameCompany: user.nameCompany,
      password: user.password,
      type: user.typeUser,
    });

    const result = await this.repository.save(userEntity);
    return UserRepository.mapEntityToModel(result);
  }

  public async list(type?: Typeruser) {
    const result = await this.repository.findBy({
      type,
    });
  }

  public static mapEntityToModel(entity: UserEntity): User {
    return User.create(
      entity.id,
      entity.name,
      entity.username,
      entity.password,
      entity.type,
      entity.nameCompany
    );
  }
}
