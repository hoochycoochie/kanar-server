import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinTable,
  
} from 'typeorm';

import uuid from 'uuid/v4';
import Category from './category.entity';
import Member from './member.entity';
import Company from './company.entity';
import ProductOperation from './product_operation.entity';
import SalePoint from './sale_point.entity';

@Entity({ name: 'product' })
class Product extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: false, unique: true })
  reference: number;
  @Column()
  isActive: boolean;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @Column({ type: 'varchar', nullable: true })
  picture_public_id: string;

  @Column({ type: 'uuid' })
  companyId: string;

  @Column({ type: 'uuid', nullable: true })
  categoryId: string;

  @Column('uuid')
  authorId: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @ManyToOne(() => Company, company => company.products)
  company: Company;

  @OneToMany(() => Product, product => product.productoperations)
  productoperations: ProductOperation[];

  @ManyToOne(() => Member, member => member.products)
  author: Member;
  @ManyToMany(() => SalePoint)
  @JoinTable({
    name: 'product_salepoint',
  })
  salepoints: SalePoint[];
  @BeforeInsert()
  addId() {
    this.id = uuid();
    this.reference = Math.floor(Math.random() * (5000 - 1000) + 10000);
  }
}

export default Product;
