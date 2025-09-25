// ChatPage.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ChatPage.module.scss";
import Link from "next/link";

type Message = {
  id: number;
  text: string;
  link?: string;
  sender: "me" | "server";
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const nextId = useRef(1);

  useEffect(() => {
    const socket = new WebSocket("wss://ws.postman-echo.com/raw");
    wsRef.current = socket;

    socket.onmessage = (event) => {
      if (event.data) {
        setMessages((prev) => [
          ...prev,
          { id: nextId.current++, text: String(event.data), sender: "server" },
        ]);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = input.trim();

    // показать своё сообщение
    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, text: msg, sender: "me" },
    ]);

    // эмуляция ответа сервера
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          text: "Мой ТГ: ",
          link: "@sergio_kapsamun",
          sender: "server",
        },
      ]);
    }, 500);

    setInput("");
  };

  return (
    <main className={styles.container}>
      <Link href="/" className="backLink">
        ← Домой
      </Link>
      <h1 className={styles.title}>Чат</h1>

      <div className={styles.messagesContainer}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`${styles.messageWrapper} ${
              m.sender === "me"
                ? styles.messageWrapperMe
                : styles.messageWrapperServer
            }`}
          >
            <span
              className={`${styles.messageBubble} ${
                m.sender === "me"
                  ? styles.messageBubbleMe
                  : styles.messageBubbleServer
              }`}
            >
              {m.text}
              {m.link && (
                <>
                  <a
                    href="https://t.me/sergio_kapsamun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.link} ${
                      m.sender === "me" ? styles.linkMe : styles.linkServer
                    }`}
                  >
                    {m.link}
                  </a>
                  . У меня есть чат в Гитхабе, правда на Vue 3, Socket IO и
                  Pinia. Опыт есть)
                </>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Введите сообщение..."
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.button}>
          Отправить
        </button>
      </div>
    </main>
  );
}
