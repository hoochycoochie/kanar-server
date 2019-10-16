import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  OneToMany,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import uuid from 'uuid/v4';
import SalePoint from './sale_point.entity';
import Member from './member.entity';
import Product from './product.entity';

@Entity({ name: 'company' })
class Company extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;
  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @Column({ type: 'varchar', nullable: true })
  picture_public_id: string;
  @Column({ type: 'int', nullable: false, unique: true })
  reference: number;

  @Column({ type: 'uuid', nullable: false })
  author_id: string;

  @Column({ type: 'uuid', nullable: false })
  owner_id: string;

  @OneToOne(() => Member)
  @JoinColumn({ name: 'owner_id' })
  owner: Member;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => SalePoint, salepoint => salepoint.company)
  salepoints: SalePoint[];

  @OneToMany(() => Member, member => member.company)
  members: Member[];

  @OneToMany(() => Company, company => company.products)
  products: Product[];

  @ManyToOne(() => Member, member => member.companies)
  @JoinColumn({ name: 'author_id' })
  author: Member;


  @BeforeInsert()
  addId() {
    this.id = uuid();
    this.reference = Math.floor(Math.random() * (5000 - 1000) + 10000);
  }
}

export default Company;
