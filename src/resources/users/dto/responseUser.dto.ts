import { UserEntity } from '../../../entity/User.entity';

export class ResponseUserDto {
  public name: string;

  public  id: string;

  public  login: string;

  constructor(model: UserEntity) {
    this.id = model.id;
    this.login = model.login;
    this.name = model.name;
  }
}
