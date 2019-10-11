import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import SalePointService from '../services/salepoint.service';

class SalePointController implements Controller {
  public path = '/salepoints';
  public router: Router = express.Router();
  private salePointService = new SalePointService();

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
      const data = await this.salePointService.find();

      response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default SalePointController;
