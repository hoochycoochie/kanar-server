import express, { Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../dtos/user.dto';
import AuthenticationService from '../services/authentication.service';
import Member from '../entities/member.entity';

class MemberController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    );

    this.router.get(
      `${this.path}/users`,
      //validationMiddleware(CreateUserDto),
      this.findAll
    );
  }

  private findAll = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const user = new Member();

      user.name = 'Fall';
      user.lastname = 'Hey joe';
      user.password = 'amadou';
      // user.email = "toto@live.fr";
      user.confirmed = true;
      await user.save();
      const users = await Member.find();

      response.status(200).send(users);
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  };
  private registration = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = request.body;
    try {
      const { cookie, user } = await this.authenticationService.register(
        userData
      );
      response.setHeader('Set-Cookie', [cookie]);
      response.send(user);
    } catch (error) {
      next(error);
    }
  };
}

export default MemberController;
