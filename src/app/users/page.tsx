import { getUsers } from "@/lib/api";
import UsersClient from "./UsersClient";
import type { Metadata } from "next";
export const revalidate = 1800;
export const metadata: Metadata = {
  title: "Список пользователей",
  description: "Посмотрите список пользователей с данными из API.",
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
    }/users`,
  },
  openGraph: {
    title: "Список пользователей",
    description: "Посмотрите список пользователей с данными из API.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/users`,
  },
};

export default async function UsersPage() {
  const users = await getUsers();

  return <UsersClient users={users} />;
}
