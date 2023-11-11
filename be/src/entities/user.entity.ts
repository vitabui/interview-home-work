import { Entity, Column, Index, OneToMany } from 'typeorm';
import Model from './model.entity';
import { Post } from './post.entity';

@Entity('users')
export class User extends Model {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({type: 'date'})
  dob: Date;

  @Column({ type: 'timestamp'})
  created_at: Date;

  // @Index('email_index')
  // @Column({
  //   unique: true,
  // })
  // email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Post, (post) => post.owner)
  posts: Post[];
}
