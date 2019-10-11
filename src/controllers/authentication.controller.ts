import express, { Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../dtos/user.dto';
import AuthenticationService from '../services/authentication.service';
import LogInDto from '../dtos/logIn.dto';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.login
    );
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.authenticationService.login(req.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.log('error', error.path);

      res.status(403).json({ success: false, error });
    }
  };
}

export default AuthenticationController;
