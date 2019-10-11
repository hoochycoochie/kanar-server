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

import Role from './role.entity';
import Member from './member.entity';
import Company from './company.entity';

@Entity({ name: 'member_role' })
class MemberRole extends BaseEntity {
  @PrimaryColumn('uuid')
  memberId: string;

  @PrimaryColumn('uuid')
  roleId: string;

  @Column({ type: 'uuid', nullable: true, unique: false })
  companyId: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToOne(() => Member)
  @JoinColumn()
  member: Member;
  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  // @OneToOne(() => Company)
  // @JoinColumn()
  // company: Company;
}

export default MemberRole;
