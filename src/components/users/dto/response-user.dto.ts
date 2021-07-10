import { IUserResponse, IUser } from '../interface/user.interface';

export class ResponseUserDto implements IUserResponse {
  name: string;
  id: string;
  login: string;

  constructor(model: IUser) {
    this.name = model.name;
    this.id = model.id;
    this.login = model.login;
  }
}
