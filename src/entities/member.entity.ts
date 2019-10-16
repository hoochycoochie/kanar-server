import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import uuid from 'uuid/v4';
import Role from './role.entity';
import Category from './category.entity';
import Company from './company.entity';
import Product from './product.entity';
import SalePoint from './sale_point.entity';
import ProductOperation from './product_operation.entity';
import bcrypt from 'bcryptjs';

@Entity({ name: 'member' })
class Member extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;
  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public fullname: string;
  @Column({ type: 'varchar' })
  public lastname: string;

  @Column({ type: 'boolean', default: false })
  public confirmed: boolean;

  @Column({ type: 'boolean', default: false })
  public is_active: boolean;

  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  public phone: string;

  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @Column({ type: 'varchar', nullable: true })
  picture_public_id: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  public password: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'member_role',
    joinColumn: {
      name: 'member_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @ManyToMany(() => SalePoint)
  @JoinTable({
    name: 'member_salepoint',
    joinColumn: {
      name: 'member_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'salepoint_id',
      referencedColumnName: 'id',
    },
  })
  workingplaces: SalePoint[];

  @OneToMany(() => Category, category => category.author)
  categories: Category[];

  @OneToMany(() => Company, company => company.author)
  companies: Company[];

  @OneToMany(() => Product, product => product.author)
  products: Product[];

  @OneToMany(() => SalePoint, salePoint => salePoint.author)
  salepoints: SalePoint[];
  
  @ManyToOne(() => Company, company => company.members)
  @JoinColumn({ name: 'company_id' })
  company: Company;
  @OneToMany(
    () => ProductOperation,
    productOperation => productOperation.author
  )
  productOperations: ProductOperation[];

  hashPassword = async () => {
    this.password = await bcrypt.hash(this.password, 8);
  };

  checkIfUnencryptedPasswordIsValid = async (unencryptedPassword: string) => {
    const result: boolean = await bcrypt.compare(
      unencryptedPassword,
      this.password
    );
    return result;
  };
  @BeforeInsert()
  addId() {
    this.id = uuid();
    this.fullname = `${this.name} ${this.lastname}`;
  }
}

export default Member;
