import { User } from "@/app/types/user";
import UserCard from "@/components/UserCard/UserCard";

interface UsersListProps {
  users: User[];
  layout?: "grid" | "list";
  variant?: "default" | "compact";
}

export default function UsersList({
  users,
  layout = "grid",
  variant = "default",
}: UsersListProps) {
  const layoutClasses =
    layout === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "flex flex-col gap-4";

  return (
    <div className={layoutClasses}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
