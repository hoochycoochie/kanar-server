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
  }

  private find = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const products = await this.productService.find();

      response.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
