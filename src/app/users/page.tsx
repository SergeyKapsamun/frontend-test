import { getUsers } from "@/lib/api";
import UsersClient from "./UsersClient";
export const revalidate = 1800;
export default async function UsersPage() {
  const users = await getUsers();

  return <UsersClient users={users} />;
}
