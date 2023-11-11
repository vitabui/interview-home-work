import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

export default abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  //
  // @CreateDateColumn({ type: 'timestamp', precision: 6 })
  // created_date: Date;
  //
  // @UpdateDateColumn({ type: 'timestamp', precision: 6 })
  // updated_date: Date;
}
