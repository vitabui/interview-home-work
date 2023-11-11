import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post extends Model {
  @Column({
    type: 'varchar',
    unique: true,
  })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column('varchar', { array: true })
  tags: string[];

  @Column({ type: 'timestamp'})
  created_at: Date;

  @ManyToOne(() => User, (owner) => owner.posts)
  @JoinColumn()
  owner: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
