import { User } from 'src/users/schemas/user.schema';

export interface AppRequest extends Request {
  user: User;
}
