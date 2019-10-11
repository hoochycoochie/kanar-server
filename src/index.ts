import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import AuthenticationController from './controllers/authentication.controller';
import * as config from './ormconfig';
import validateEnv from './utils/validateEnv';
import MemberController from './controllers/member.controller';
import mock from './mock';
import ProductController from './controllers/product.controller';
import CategoryController from './controllers/category.controller';
import UserController from './controllers/user.controller';
import SalePointController from './controllers/salepoint.controller';

validateEnv();

(async () => {
  try {
    const connection = await createConnection(config);
    await connection.dropDatabase();

    await connection.synchronize();
    await mock();
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App([
    new AuthenticationController(),
    new MemberController(),
    new ProductController(),
    new CategoryController(),
    new UserController(),
    new SalePointController(),
  ]);
  app.listen();
})();
