import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import ProductService from '../services/product.service';

class ProductController implements Controller {
  public path = '/products';
  public router: Router = express.Router();
  private productService = new ProductService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,

      this.find
    );

    this.router.get(
      `${this.path}/salepoint`,

      this.findBySalePointAndCompany
    );
  }

  private find = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.productService.find();

      response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private findBySalePointAndCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = req.query;

      console.log('query========================================', query);
      const data = await this.productService.findAll(query);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
