import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import CategoryService from '../services/category.service';

class CategoryController implements Controller {
  public path = '/categories';
  public router: Router = express.Router();
  private categoryService = new CategoryService();

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
      const data = await this.categoryService.find(req.body);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.categoryService.create(req.body);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
