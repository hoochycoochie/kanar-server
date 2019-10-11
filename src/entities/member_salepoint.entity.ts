import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Member from './member.entity';
import SalePoint from './sale_point.entity';

@Entity({ name: 'member_salepoint' })
class MemberSalePoint extends BaseEntity {
  @PrimaryColumn('uuid')
  memberId: string;

  @PrimaryColumn('uuid')
  salepointId: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  @Column({ type: 'uuid', nullable: true, unique: false })
  companyId: string;
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Member)
  @JoinColumn()
  member: Member;

  @OneToOne(() => SalePoint)
  @JoinColumn()
  salepoint: SalePoint;
}

export default MemberSalePoint;
