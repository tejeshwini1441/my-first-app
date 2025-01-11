import styles from "./page.module.css";
import prisma from '@/lib/prisma';
import AddPost from './add-post/page'; // Import the AddPost component
import DeletePostButton from './components/DeletePostButton'; // Import the DeletePostButton component

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  console.log({ posts });

  return (
    <main className={styles.main}>
      <h1>Feed</h1>
      
      <div className={styles.posts}>
        {posts.map((post) => {
          return (
            <div key={post.id} className={styles.post}>
              <h2 className={styles['post-title']}>{post.title}</h2>
              <p className={styles['post-author']}>By {post.author.name}</p>
              <p className={styles['post-content']}>{post.content}</p>

              {/* Include DeletePostButton here */}
              <DeletePostButton id={post.id} />
            </div>
          );
        })}
      </div>
      
      <AddPost />  {/* Include AddPost component here */}
      
      <footer>
        <p>Powered by Prisma & Next.js</p>
      </footer>
    </main>
  );
}