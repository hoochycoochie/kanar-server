import faker from 'faker';
import Role from '../entities/role.entity';
import { getRepository } from 'typeorm';
import Member from '../entities/member.entity';
import Company from '../entities/company.entity';
import SalePoint from '../entities/sale_point.entity';
import Category from '../entities/category.entity';
import Product from '../entities/product.entity';
import MemberRole from '../entities/member_role.entity';
import MemberSalePoint from '../entities/member_salepoint.entity';

const TOTAL_PRODUCT = 50;
export default async () => {
  try {
    const roleRepository = getRepository(Role);
    const userRepository = getRepository(Member);
    const companyRepository = getRepository(Company);
    const salepointRepository = getRepository(SalePoint);
    const categoryRepository = getRepository(Category);
    const productRepository = getRepository(Product);
    const memberRoleRepository = getRepository(MemberRole);
    const memberSalepointRepository = getRepository(MemberSalePoint);

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
      picture: `https://randomuser.me/api/portraits/men/1.jpg`,
      picture_public_id: faker.commerce.productMaterial(),
    });
    await admin.hashPassword();
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
      picture: `https://randomuser.me/api/portraits/men/2.jpg`,
      picture_public_id: faker.commerce.productMaterial(),
    });
    await manager.hashPassword();
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
      picture: `https://randomuser.me/api/portraits/men/3.jpg`,
      picture_public_id: faker.commerce.productMaterial(),
    });
    await saler.hashPassword();
    await saler.save();

    const salerManager = await userRepository.create({
      is_active: true,
      name: 'SalerManager',
      lastname: 'Fall',
      confirmed: true,
      email: 'salerManager@live.fr',
      phone: '0782297584',
      roles: [roleSalerManager, roleSalerWorker],
      password: 'amadou',
      fullname: 'toto',
      picture: `https://randomuser.me/api/portraits/men/3.jpg`,
      picture_public_id: faker.commerce.productMaterial(),
    });
    await salerManager.hashPassword();
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
      picture: `https://randomuser.me/api/portraits/men/4.jpg`,
      picture_public_id: faker.commerce.productMaterial(),
    });
    await salerWorker.hashPassword();
    await salerWorker.save();

    //companies and salepoint dummy data

    const company1 = await companyRepository.create({
      name: 'yum yum ',
      description: faker.lorem.paragraph(),
      author_id: manager.id,
      owner_id: saler.id,
      picture: `https://randomuser.me/api/portraits/men/4.jpg`,
      picture_public_id: faker.commerce.productMaterial(),
    });

    await company1.save();

    const memberRoleQuery: string =
      'role_id=:role_id AND member_id = :member_id';
    const memberRoleSaler = await memberRoleRepository
      .createQueryBuilder()
      .update(MemberRole)
      .set({ company_id: company1.id, name: roleSaler.name })
      .where(memberRoleQuery, {
        role_id: roleSaler.id,
        member_id: saler.id,
      })

      .execute();

    const memberRoleSalerManager = await memberRoleRepository
      .createQueryBuilder()
      .update(MemberRole)
      .set({ company_id: company1.id, name: roleSalerManager.name })
      .where(memberRoleQuery, {
        role_id: roleSalerManager.id,
        member_id: salerManager.id,
      })
      .execute();

    const memberRoleSalerManager2 = await memberRoleRepository
      .createQueryBuilder()
      .update(MemberRole)
      .set({ company_id: company1.id, name: roleSalerWorker.name })
      .where(memberRoleQuery, {
        role_id: roleSalerWorker.id,
        member_id: salerManager.id,
      })
      .execute();

    const memberRoleSalerWorker = await memberRoleRepository
      .createQueryBuilder()
      .update(MemberRole)
      .set({ company_id: company1.id, name: roleSalerWorker.name })
      .where(memberRoleQuery, {
        role_id: roleSalerWorker.id,
        member_id: salerWorker.id,
      })
      .execute();

    console.log('memberRoleSaler', memberRoleSaler);
    console.log('memberRoleSalerManager', memberRoleSalerManager);
    console.log('memberRoleSalerWorker', memberRoleSalerWorker);
    const salepoint1 = await salepointRepository.create({
      name: faker.name.jobArea(),
      //  description: faker.lorem.paragraph(),

      author_id: saler.id,
      company_id: company1.id,
    });

    await salepoint1.save();

    const salepoint2 = await salepointRepository.create({
      name: faker.name.jobArea(),
      // description: faker.lorem.paragraph(),

      author_id: saler.id,
      company_id: company1.id,
    });

    await salepoint2.save();

    salerWorker.workingplaces = [salepoint1, salepoint2];
    salerManager.workingplaces = [salepoint1, salepoint2];
    await salerWorker.save();
    await salerManager.save();
    const membeSalePointQuery: string =
      'member_id=:member_id AND salepoint_id = :salepoint_id';

    const memberSalepoint1 = await memberRoleRepository
      .createQueryBuilder()
      .update(MemberSalePoint)
      .set({ company_id: company1.id, name: salepoint1.name })
      .where(membeSalePointQuery, {
        salepoint_id: salepoint1.id,
        member_id: salerWorker.id,
      })
      .execute();

    const memberSalepoint2 = await memberRoleRepository
      .createQueryBuilder()
      .update(MemberSalePoint)
      .set({ company_id: company1.id, name: salepoint2.name })
      .where(membeSalePointQuery, {
        salepoint_id: salepoint2.id,
        member_id: salerWorker.id,
      })
      .execute();

    const memberSalepoint11 = await memberRoleRepository
      .createQueryBuilder()
      .update(MemberSalePoint)
      .set({ company_id: company1.id, name: salepoint1.name })
      .where(membeSalePointQuery, {
        salepoint_id: salepoint1.id,
        member_id: salerManager.id,
      })
      .execute();

    const memberSalepoint21 = await memberRoleRepository
      .createQueryBuilder()
      .update(MemberSalePoint)
      .set({ company_id: company1.id, name: salepoint2.name })
      .where(membeSalePointQuery, {
        salepoint_id: salepoint2.id,
        member_id: salerManager.id,
      })
      .execute();

    console.log('memberSalepoint1', memberSalepoint1);
    console.log('memberSalepoint2', memberSalepoint2);

    const cat1 = await categoryRepository.create({
      name: 'Quincaillerie',
      description: faker.lorem.paragraph(),
      author_id: saler.id,
    });
    await cat1.save();

    await Array.from({ length: TOTAL_PRODUCT }).forEach(async (_, i) => {
      const prod1 = await productRepository.create({
        company_id: company1.id,
        author_id: saler.id,
        category_id: cat1.id,
        price: parseFloat(faker.commerce.price()),
        quantity: parseFloat(faker.commerce.price()),
        is_active: true,
        picture: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        picture_public_id: faker.lorem.slug(),

        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
      });
      prod1.salepoints = [salepoint1, salepoint2];
      await prod1.save();
    });
  } catch (error) {
    console.log('error============  =', error.message);
    throw error;
  }
};
