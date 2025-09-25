"use client";

import { useEffect, useState } from "react";
import styles from "./PostsPage.module.scss";
import Link from "next/link";

type Post = { id: number; title: string };

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=50"
        );
        const data = await res.json();
        setPosts(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className={styles.container}>
      <Link href="/" className="backLink">
        ← Домой
      </Link>

      {loading ? (
        <p className={styles.loading}>Загрузка…</p>
      ) : (
        <ul className={styles.postsList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <span className={styles.postId}>#{post.id}</span>
              <span className={styles.postTitle}>{post.title}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
