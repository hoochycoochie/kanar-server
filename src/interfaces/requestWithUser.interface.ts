import { Request } from 'express';

interface RequestWithUser extends Request {
  user_id: string;
}

export default RequestWithUser;
