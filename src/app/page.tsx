import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}> Test Frontend</h1>

        <p className={styles.description}>Эта страница статична SSG</p>

        <div className={styles.buttons}>
          <Link href="/users" className={styles.primaryButton}>
            ISR - Пользователи
          </Link>
          <Link href="/users/1" className={styles.primaryButton}>
            SSR - Пользователь
          </Link>
          <Link href="/posts" className={styles.primaryButton}>
            CSR - Посты
          </Link>
          <Link href="/chat" className={styles.primaryButton}>
            Chat - WebSocket
          </Link>
        </div>
        <footer className={styles.footer}>
          {" "}
          <Link
            href={"https://github.com/SergeyKapsamun/frontend-test"}
            target="_blank"
            className={styles.ghLink}
          >
            Ссылка на GitHub
          </Link>
          <Link
            href={
              "https://krasnodar.hh.ru/resume/8899e47dff0f6b5b010039ed1f507830346d61"
            }
            target="_blank"
            className={styles.ghLink}
          >
            Ссылка на HH профиль
          </Link>
          <Link
            href={"https://t.me/sergio_kapsamun"}
            target="_blank"
            className={styles.ghLink}
          >
            Ссылка на Telegram
          </Link>
        </footer>
      </div>
    </div>
  );
}
