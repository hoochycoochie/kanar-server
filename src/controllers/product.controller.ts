import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import ProductService from '../services/product.service';
import saler_manager from '../middleware/saler_manager.middleware';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';

class ProductController implements Controller {
  public path = '/products';
  public router: Router = express.Router();
  private productService = new ProductService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      [authMiddleware, saler_manager],
      this.find
    );

    this.router.get(
      `${this.path}/salepoint/:salepointId/:companyId`,
      this.findBySalePointAndCompany
    );
  }

  private find = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log('authorization', req.headers.authorization);
      const authorization: string = req.headers.authorization;
      let token = authorization.split(' ')[1];
      const data = await this.productService.find(req.body);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private findBySalePointAndCompany = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = req.query;
      const salepointId = req.params.salepointId;
      const companyId = req.params.companyId;

      const data = await this.productService.findAll({
        salepointId,
        companyId,
        query,
      });

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
