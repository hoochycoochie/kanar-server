import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import MemberService from '../services/member.service';

class MemberController implements Controller {
  public path = '/members';
  public router: Router = express.Router();
  private memberService = new MemberService();

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
      const data = await this.memberService.find(req.body);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default MemberController;
