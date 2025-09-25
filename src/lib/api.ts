import { User } from "@/app/types/user";

// Получение всех пользователей (ISR)
export async function getUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 1800 }, // 30 минут
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

// Получение одного пользователя (SSR)
export async function getUser(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    if (response.status === 404) throw new Error("User not found");
    throw new Error("Failed to fetch user");
  }
  return response.json();
}
