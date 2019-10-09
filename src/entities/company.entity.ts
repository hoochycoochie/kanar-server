import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  OneToMany,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import uuid from 'uuid/v4';
import { Name } from './name_description_embedded.entity';
import SalePoint from './sale_point.entity';
import Member from './member.entity';

@Entity({ name: 'company' })
class Company extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;

  @Column(() => Name)
  name: Name;
  @Column({ type: 'int', nullable: false, unique: true })
  reference: number;

  @Column({ type: 'uuid', nullable: false })
  authorId: string;

  @Column({ type: 'uuid', nullable: false })
  ownerId: string;

  @OneToOne(() => Member)
  @JoinColumn()
  author: Member;

  @OneToOne(() => Member)
  @JoinColumn()
  owner: Member;
  @OneToMany(() => SalePoint, salepoint => salepoint.company)
  salepoints: SalePoint[];
  @BeforeInsert()
  addId() {
    this.id = uuid();
    this.reference = Math.floor(Math.random() * (5000 - 1000) + 10000);
  }
}

export default Company;
