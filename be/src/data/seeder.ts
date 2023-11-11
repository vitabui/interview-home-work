import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { Comment } from '../entities/comment.entity';
import { AppDataSource } from '../utils/data-source';
import path from "path";
import fs from "fs";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);
const commentRepository = AppDataSource.getRepository(Comment);

AppDataSource.initialize()
  .then(async () => {
    console.log('Connected to database...');
      try {
          // Import users data
          const userPath = path.resolve(__dirname, "../../data/users.json");
          const usersData = JSON.parse(fs.readFileSync(userPath, "utf-8"));

          await userRepository.createQueryBuilder('user').delete();
          for (const user of usersData) {
              const [month, day, year] = user.dob.split('/');
              const userInput: Partial<User> = {
                  ...user,
                  created_at: new Date(user.created_at).toISOString(),
                  dob: new Date(+year, +month - 1, +day)
              };
              await userRepository.save(userRepository.create(userInput));
        }
          console.log(`Added all users to database`);

          // Import posts data
          const postPath = path.resolve(__dirname, "../../data/posts.json");
          const postData = JSON.parse(fs.readFileSync(postPath, "utf-8"));

          await postRepository.createQueryBuilder('post').delete();
          for (const post of postData) {
              const postInput: Partial<Post> = {
                  ...post,
                  created_at: new Date(post.created_at).toISOString(),
                  owner: await userRepository.findOneBy({id: post.owner})
              };
              await postRepository.save(postRepository.create(postInput));
          }
          console.log(`Added all posts to database`);

          // Import comments data
          const commentPath = path.resolve(__dirname, "../../data/comments.json");
          const cmtData = JSON.parse(fs.readFileSync(commentPath, "utf-8"));

          await commentRepository.createQueryBuilder('comment').delete();
          for (const cmt of cmtData) {
              const cmtInput: Partial<Comment> = {
                  ...cmt,
                  created_at: new Date(cmt.created_at).toISOString(),
                  post: await postRepository.findOneBy({id: cmt.post}),
                  owner: await userRepository.findOneBy({id: cmt.owner}),
              };
              await commentRepository.save(commentRepository.create(cmtInput));
          }
          console.log(`Added all comments to database`);

      } catch (error) {
        console.log(error);
        process.exit(1);
      }
  })
  .catch((error: any) => console.log(error));
