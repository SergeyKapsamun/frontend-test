"use client";

import { useState } from "react";
import AddUserModal from "@/components/AddUserModal/AddUserModal";
import UsersList from "@/components/UsersList/UsersList";
import styles from "./users.module.scss";
import { mockApiRequest } from "@/lib/mockApi";
import { User } from "../types/user";
import Link from "next/link";

interface UsersClientProps {
  users: User[];
}

export default function UsersClient({ users }: UsersClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersList, setUsersList] = useState(users);

  const handleAddUser = async (formData: FormData) => {
    console.log("User data:", Object.fromEntries(formData));
    try {
      await mockApiRequest(formData);
      const newUser: User = {
        id: usersList.length + 1,
        name: formData.get("name") as string,
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        website: formData.get("website") as string,
        company: {
          name: formData.get("companyName") as string,
          catchPhrase: formData.get("catchPhrase") as string,
          bs: formData.get("bs") as string,
        },
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: { lat: "", lng: "" },
        },
      };
      setUsersList([newUser, ...usersList]);
    } catch (error) {
      console.error("Error adding user:", error);
      return;
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <Link href="/" className="backLink">
          ← Домой
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.addButtonPremium}
        >
          Добавить пользователя
        </button>

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddUser={handleAddUser}
        />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Список пользователей</h1>
          <p className={styles.description}>
            Всего пользователей: {usersList.length}
          </p>
        </div>

        <UsersList users={usersList} layout="grid" />
      </div>
    </div>
  );
}
