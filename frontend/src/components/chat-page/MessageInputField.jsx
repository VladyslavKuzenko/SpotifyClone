import { useState } from "react";
import styles from "./ChatPage.module.css";
import { useAPI } from "../../hooks/useApi";

const MessageInputField = ({ chatId, onSend }) => {
  const { apiFetch } = useAPI();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await apiFetch("/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentJson: JSON.stringify({ text: message }),
          chatId,
        }),
      });

      setMessage("");
      if (onSend) onSend();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles["bottom-side"]}>
      <input
        type="text"
        className={styles["send-message"]}
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles["send-message-menu"]}>
        
        <button className={styles["micro-plat"]}>
          <div className={styles.micro}></div>
        </button>
        <button className={styles["gallery-plat"]}>
          <div className={styles.gallery}></div>
        </button>

        <button className={styles["music-plat"]}>
          <div className={styles.music}></div>
        </button>
      </div>
    </div>
  );
};

export default MessageInputField;
