import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
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
  author_id: string;

  @Column({ type: 'uuid', nullable: false })
  company_id: string;

  @Column({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'uuid', nullable: true })
  salepoint_id: string;

  @ManyToOne(() => Member, member => member.salepoints)
  @JoinColumn({ name: 'author_id' })
  author: Member;

  @ManyToOne(() => Company, company => company.salepoints)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => SalePoint, salePoint => salePoint.productOperations)
  @JoinColumn({ name: 'salepoint_id' })
  salepoint: SalePoint;

  @ManyToOne(() => Product, product => product.productoperations)
  @JoinColumn({ name: 'product_id' })
  product: Product;
  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}

export default ProductOperation;
