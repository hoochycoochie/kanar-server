import { Request } from 'express';
import User from '../dtos/user.dto';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
