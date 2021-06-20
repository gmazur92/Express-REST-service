import { UserEntity } from '../../../entity/User.entity';

export class ResponseUserDto {
  public name: string | undefined;

  public  id: string | undefined;

  public  login: string | undefined;

  constructor(model: UserEntity) {
    this.id = model.id;
    this.login = model.login;
    this.name = model.name;
  }
}
