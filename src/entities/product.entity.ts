import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';

import uuid from 'uuid/v4';
import { Name } from './name_description_embedded.entity';
import Category from './category.entity';
import Member from './member.entity';
import Company from './company.entity';
import ProductOperation from './product_operation.entity';

@Entity({ name: 'product' })
class Product extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;

  @Column(() => Name, { prefix: false })
  name: Name;

  @Column()
  isActive: boolean;

  @Column({ type: 'decimal' })
  price: number;

  @Column('int')
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

  @OneToMany(() => Product, product => product.productoperations)
  productoperations: ProductOperation[];
  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}

export default Product;
