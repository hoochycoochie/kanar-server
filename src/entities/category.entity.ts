import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import uuid from 'uuid/v4';
import Product from './product.entity';
import Member from './member.entity';

@Entity({ name: 'category' })
class Category extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'uuid', nullable: false })
  authorId: string;
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => Member, member => member.categories)
  author: Member;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}

export default Category;
