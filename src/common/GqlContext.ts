import { Request } from 'express';
import { User } from '../users/model/user';
export interface GqlContext {
  req: Request;
  user?: User;
}
