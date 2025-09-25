import { getUser } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./UserPage.module.scss";
export const dynamic = "force-dynamic";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = await getUser(id);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return {
    title: `Пользователь: ${user.name}`,
    description: `Страница профиля пользователя ${user.name}.`,
    alternates: { canonical: `${siteUrl}/users/${id}` },
    openGraph: {
      title: `Пользователь: ${user.name}`,
      description: `Страница профиля пользователя ${user.name}.`,
      url: `${siteUrl}/users/${id}`,
    },
  };
}
interface UserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;

  let user;
  try {
    user = await getUser(id);
  } catch (error) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/users" className={styles.backLink}>
          ← Назад к списку
        </Link>

        <div className={styles.card}>
          <h1 className={styles.title}>{user.name}</h1>
          <p className={styles.subtitle}>@{user.username}</p>

          <div className={styles.grid}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Контактная информация</h2>
              <div className={styles.sectionContent}>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Телефон:</strong> {user.phone}
                </p>
                <p>
                  <strong>Вебсайт:</strong> {user.website}
                </p>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Адрес</h2>
              <div className={styles.sectionContent}>
                <p>
                  {user.address.street}, {user.address.suite}
                </p>
                <p>
                  {user.address.city}, {user.address.zipcode}
                </p>
                <p>
                  Координаты: {user.address.geo.lat}, {user.address.geo.lng}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Компания</h2>
            <div className={styles.sectionContent}>
              <p>
                <strong>Название:</strong> {user.company.name}
              </p>
              <p>
                <strong>Слоган:</strong> {user.company.catchPhrase}
              </p>
              <p>
                <strong>Бизнес:</strong> {user.company.bs}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
