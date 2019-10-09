import faker from 'faker';
import Role from '../entities/role.entity';
import { getRepository } from 'typeorm';
import Member from '../entities/member.entity';
import Company from '../entities/company.entity';
import SalePoint from '../entities/sale_point.entity';
import Category from '../entities/category.entity';
import Product from '../entities/product.entity';

const TOTAL_PRODUCT = 20;
export default async () => {
  try {
    const roleRepository = getRepository(Role);
    const userRepository = getRepository(Member);
    const companyRepository = getRepository(Company);
    const salepointRepository = getRepository(SalePoint);
    const categoryRepository = getRepository(Category);
    const productRepository = getRepository(Product);

    const roleAdmin = await roleRepository.create({ name: 'admin' });
    await Role.save(roleAdmin);

    const roleManager = await roleRepository.create({ name: 'manager' });
    await Role.save(roleManager);

    const roleSaler = await roleRepository.create({ name: 'saler' });
    await Role.save(roleSaler);
    const roleSalerManager = await roleRepository.create({
      name: 'salerManager',
    });
    await Role.save(roleSalerManager);
    const roleSalerWorker = await roleRepository.create({
      name: 'salerWorker',
    });
    await Role.save(roleSalerWorker);

    const admin = await userRepository.create({
      is_active: true,
      name: 'Admin',
      lastname: 'Fall',
      confirmed: true,
      email: 'saliou58@live.fr',
      phone: '0782297581',
      roles: [roleAdmin],
      password: 'amadou',
      fullname: 'toto',
    });
    await admin.save();

    const manager = await userRepository.create({
      is_active: true,
      name: 'Manager',
      lastname: 'Fall',
      confirmed: true,
      email: 'manager@live.fr',
      phone: '0782297582',
      roles: [roleManager],
      password: 'amadou',
      fullname: 'toto',
    });
    await manager.save();

    const saler = await userRepository.create({
      is_active: true,
      name: 'Saler',
      lastname: 'Fall',
      confirmed: true,
      email: 'saler@live.fr',
      phone: '0782297583',
      roles: [roleSaler],
      password: 'amadou',
      fullname: 'toto',
    });
    await saler.save();

    const salerManager = await userRepository.create({
      is_active: true,
      name: 'SalerManager',
      lastname: 'Fall',
      confirmed: true,
      email: 'salermanager@live.fr',
      phone: '0782297584',
      roles: [roleManager],
      password: 'amadou',
      fullname: 'toto',
    });
    await salerManager.save();

    const salerWorker = await userRepository.create({
      is_active: true,
      name: 'SalerManager',
      lastname: 'Fall',
      confirmed: true,
      email: 'salerWorker@live.fr',
      phone: '0782297585',
      roles: [roleSalerWorker],
      password: 'amadou',
      fullname: 'toto',
    });
    await salerWorker.save();

    //companies and salepoint dummy data

    const company1 = await companyRepository.create({
      name: { name: 'yum yum ', description: faker.lorem.paragraph() },
      authorId: manager.id,
      ownerId: saler.id,
    });

    await company1.save();

    const salepoint1 = await salepointRepository.create({
      name: {
        name: faker.name.jobArea(),
        description: faker.lorem.paragraph(),
      },

      authorId: saler.id,
      companyId: company1.id,
    });

    await salepoint1.save();

    const salepoint2 = await salepointRepository.create({
      name: {
        name: faker.name.jobArea(),
        description: faker.lorem.paragraph(),
      },

      authorId: saler.id,
      companyId: company1.id,
    });

    await salepoint2.save();

    const cat1 = await categoryRepository.create({
      name: { name: 'Quincaillerie', description: faker.lorem.paragraph() },
      authorId: saler.id,
    });
    cat1.save();
    console.log('cat1==============================================', cat1.id);
    await Array.from({ length: TOTAL_PRODUCT }).forEach(async (_, i) => {
      const prod1 = await productRepository.create({
        companyId: company1.id,
        authorId: saler.id,
        categoryId: cat1.id,
        price: parseFloat(faker.commerce.price()),
        quantity: parseFloat(faker.commerce.price()),
        isActive: true,
        picture: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        picture_public_id: faker.lorem.slug(),
        name: {
          name: faker.commerce.product(),
          description: faker.lorem.paragraph(),
        },
      });

      await prod1.save();
    });
  } catch (error) {
    console.log('error============  =', error.message);
    throw error;
  }
};
