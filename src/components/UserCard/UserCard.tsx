import { User } from "@/app/types/user";
import Link from "next/link";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{user.name}</h2>
      <p className={styles.username}>@{user.username}</p>
      <p className={styles.email}>{user.email}</p>

      <div className={styles.info}>
        <p className={styles.infoItem}>
          <span className={styles.icon}>📱</span>
          {user.phone}
        </p>
        <p className={styles.infoItem}>
          <span className={styles.icon}>🌐</span>
          {user.website}
        </p>
        <p className={styles.infoItem}>
          <span className={styles.icon}>🏢</span>
          {user.company.name}
        </p>
        <p className={styles.infoItem}>
          <span className={styles.icon}>📍</span>
          {user.address.city}
        </p>
      </div>

      <div className={styles.actions}>
        <Link href={`/users/${user.id}`} className={styles.link}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}
