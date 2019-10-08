import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  BaseEntity
} from 'typeorm';

import uuid from 'uuid/v4';
import { Name } from './name_description_embedded.entity';
import Product from './product.entity';
import Member from './member.entity';

@Entity({ name: 'category' })
class Category extends BaseEntity {
  @PrimaryColumn('uuid') public id: string;

  @Column(() => Name, { prefix: false })
  embedded: Name;

  @Column()
  authorId: any;
  @OneToOne(() => Member)
  @JoinColumn()
  author: Member;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}

export default Category;
