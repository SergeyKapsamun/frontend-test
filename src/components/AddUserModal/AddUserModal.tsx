// components/AddUserModal.tsx
"use client";

import { useState } from "react";
import styles from "./AddUserModal.module.scss";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: FormData) => Promise<void>;
}

export default function AddUserModal({
  isOpen,
  onClose,
  onAddUser,
}: AddUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await onAddUser(formData);
      handleClose();
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setPreviewImage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Добавить нового пользователя</h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            {/* Блок с фото */}
            <div className={styles.photoSection}>
              <div className={styles.photoUpload}>
                <div className={styles.photoPreview}>
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className={styles.previewImage}
                    />
                  ) : (
                    <div className={styles.photoPlaceholder}>
                      <span>Фото</span>
                    </div>
                  )}
                </div>
                <label className={styles.uploadLabel}>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                  />
                  <span className={styles.uploadButton}>Выбрать фото</span>
                </label>
              </div>
            </div>

            {/* Основная информация */}
            <div className={styles.infoSection}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  Полное имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={styles.input}
                  placeholder="Введите имя"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>
                  Имя пользователя *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className={styles.input}
                  placeholder="Введите username"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={styles.input}
                  placeholder="email@example.com"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={styles.input}
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
            </div>

            {/* Адрес */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Адрес</h3>
              <div className={styles.addressGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="street" className={styles.label}>
                    Улица
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    className={styles.input}
                    placeholder="Название улицы"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="suite" className={styles.label}>
                    Квартира/Офис
                  </label>
                  <input
                    type="text"
                    id="suite"
                    name="suite"
                    className={styles.input}
                    placeholder="Номер"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="city" className={styles.label}>
                    Город
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className={styles.input}
                    placeholder="Название города"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="zipcode" className={styles.label}>
                    Индекс
                  </label>
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    className={styles.input}
                    placeholder="Почтовый индекс"
                  />
                </div>
              </div>
            </div>

            {/* Компания */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Компания</h3>
              <div className={styles.inputGroup}>
                <label htmlFor="companyName" className={styles.label}>
                  Название компании
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className={styles.input}
                  placeholder="Название компании"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="catchPhrase" className={styles.label}>
                  Слоган
                </label>
                <input
                  type="text"
                  id="catchPhrase"
                  name="catchPhrase"
                  className={styles.input}
                  placeholder="Корпоративный слоган"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="bs" className={styles.label}>
                  Бизнес-направление
                </label>
                <input
                  type="text"
                  id="bs"
                  name="bs"
                  className={styles.input}
                  placeholder="Описание бизнеса"
                />
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Добавление..." : "Добавить пользователя"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
