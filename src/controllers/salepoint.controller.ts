import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../dtos/user.dto';
import AuthenticationService from '../services/authentication.service';
import CategoryService from '../services/category.service';
import SalePointService from '../services/salepoint.service';

class CategoryController implements Controller {
  public path = '/salepoints';
  public router: Router = express.Router();
  private salePointService = new SalePointService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,

      this.find
    );
  }

  private find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.salePointService.find(req.body);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
