import React from "react";
import styles from "./ChatPage.module.css";
import ChatItem from './ChatItem'
import GroupItem from './GroupItem'

const ChatList = () => {
  return (
    <div className={styles["chat-platform"]}>
      <div className={styles["search-block"]}>
        <input
          type="search"
          className={styles["chat-search"]}
          placeholder="Search"
        />
      </div>

      <div className={styles["groups-block"]}>
        <div className={styles.text1}>Groups:</div>
        <div className={styles.groups}>
          {[...Array(3)].map((_, i) => (
            <GroupItem/>
            
          ))}
        </div>
      </div>

      <div className={styles["chats-block"]}>
        <div className={styles.text2}>Chats:</div>
        <div className={styles["chats-array"]}>
          {[...Array(10)].map((_, i) => (
            <ChatItem/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
