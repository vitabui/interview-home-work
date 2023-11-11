import {Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('comments')
export class Comment extends Model {
  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'timestamp'})
  created_at: Date;

  @ManyToOne(() => User, (owner) => owner.posts)
  @JoinColumn()
  owner: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn()
  post: Post;
}
