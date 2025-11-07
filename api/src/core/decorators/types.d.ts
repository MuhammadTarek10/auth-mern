import { UserWithSession } from '../utils/token/types';

export interface AppRequest extends Request {
  user: UserWithSession;
}
