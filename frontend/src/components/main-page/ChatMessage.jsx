import React from "react";
import styles from "./main.module.css";

export default function ChatMessage() {
  return (
    <div className={styles.chatMessage1}>
      <div className={styles.avatar1} ></div>
      <div className={styles.messageContent1}>
        <div className={styles.messageLine1}>
          <span className={styles.username1}>username</span>
          <span className={styles.message1}>
            This is a long message containing supercalifragilisticexpialidocious and other extraordinary words that might not fit in a single line and therefore should be properly hyphenated and wrapped across multiple lines to ensure perfect readability and structure.

          </span>
        </div>
      </div>
    </div>
  );
}
