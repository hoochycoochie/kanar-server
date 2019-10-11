import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

import uuid from 'uuid/v4';

import Company from './company.entity';
import Product from './product.entity';
import SalePoint from './sale_point.entity';
import Member from './member.entity';

const SALE = 'SALE';
const RETURN = 'RETURN';
const ADD = 'ADD';
export type OpeartionType = 'SALE' | 'RETURN' | 'ADD';

@Entity({ name: 'productoperation' })
class ProductOperation extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;

  @Column({
    type: 'enum',
    enum: [SALE, RETURN, ADD],
  })
  role: OpeartionType;

  @Column({ type: 'uuid', nullable: false })
  authorId: string;

  @Column({ type: 'uuid', nullable: false })
  companyId: string;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Column({ type: 'uuid', nullable: true })
  salepointId: string;

  @ManyToOne(() => Member, member => member.salepoints)
  author: Member;

  @ManyToOne(() => Company, company => company.salepoints)
  company: Company;

  @ManyToOne(() => SalePoint, salePoint => salePoint.productOperations)
  salepoint: SalePoint;

  @ManyToOne(() => Product, product => product.productoperations)
  product: Product;
  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}

export default ProductOperation;
