import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';

import BaseController from './base.controller';
import Category from '../entities/category.entity';

class CategoryController extends BaseController implements Controller {
  constructor() {
    super('/categories', Category);
  }
}

export default CategoryController;
