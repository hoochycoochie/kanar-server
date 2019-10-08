import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryColumn,
  OneToMany,
  BaseEntity
} from "typeorm";

import uuid from "uuid/v4";
import { Name } from "./name_description_embedded.entity";
import SalePoint from "./sale_point.entity";

@Entity({ name: "company" })
class Company extends BaseEntity {
  @PrimaryColumn("uuid") public id: string;

  @Column(() => Name)
  name: Name;

  @OneToMany(() => SalePoint, salepoint => salepoint.company)
  salepoints: SalePoint[];
  @BeforeInsert()
  addId() {
    this.id = uuid();
  }
}

export default Company;
