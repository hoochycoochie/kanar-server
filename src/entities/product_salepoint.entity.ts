import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Product from './product.entity';
import SalePoint from './sale_point.entity';

@Entity({ name: 'product_salepoint' })
class ProductSalePoint extends BaseEntity {
  @PrimaryColumn('uuid')
  salepoint_id: string;

  @PrimaryColumn('uuid')
  product_id: string;

  // @Column()
  // @CreateDateColumn()
  // created_at: Date;

  // @Column()
  // @UpdateDateColumn()
  // updated_at: Date;
  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
  @OneToOne(() => SalePoint)
  @JoinColumn({ name: 'salepoint_id' })
  salepoint: SalePoint;
}

export default ProductSalePoint;
