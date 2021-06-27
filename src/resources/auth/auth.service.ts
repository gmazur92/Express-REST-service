import * as userService from '../users/user.service';
import { UserEntity } from '../../entity/User.entity';
import { comparePassword, generateToken } from '../../utils/auth.utils';
import { MissingDetailsError } from '../../error/MissingDetailsError';
import { NoRecordError } from '../../error/NoRecordError';
import { InvalidError } from '../../error/IvalidError';

const signIn = async (dto: {login: string, password: string}): Promise<{token: string}> => {
  const {login, password} = dto;
  if (!login || !password) {
    throw new MissingDetailsError('Not all fields have been entered.');
  }
  const userRecord: UserEntity|undefined = await userService.findByLogin(login);
  if (!userRecord) throw new NoRecordError('No account with this login has been registered.');
  const isMatch: boolean = await comparePassword(password, userRecord.password);
  if (!isMatch) throw new InvalidError('Invalid login or password');
  const token: string = generateToken(userRecord)
  return {token};
};

export { signIn };
