import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import BaseService from '../services/base.service';

class BaseController implements Controller {
  public path: string;
  public router: Router = express.Router();
  private service: BaseService;

  constructor(path: string, entity: any) {
    this.path = path;

    this.service = new BaseService(entity);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.find);
    this.router.post(`${this.path}`, this.save);

    this.router.get(`${this.path}/:id`, this.findOne);
    this.router.put(`${this.path}/:id`, this.update);
  }

  private find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.find();

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.findOne(req.params.id);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private save = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.save(req.body);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.update(req.params.id, req.body);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default BaseController;
