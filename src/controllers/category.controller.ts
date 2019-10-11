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
    this.router.get(`${this.path}`, this.find);
    this.router.get(`${this.path}/:id`, this.findById);
  }

  private find = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.categoryService.find();

      response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private findById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.categoryService.findById(request.params.id);

      response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
