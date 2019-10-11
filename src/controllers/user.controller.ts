import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import UserService from '../services/user.service';

class UserController implements Controller {
  public path = '/users';
  public router: Router = express.Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,

      this.find
    );
  }

  private find = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.userService.find();

      response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
