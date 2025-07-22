import { useEffect, useState, useRef } from "react";
import styles from "./ChatPage.module.css";
import PrivateChatItem from './PrivateChatItem';
import GroupChatItem from './GroupChatItem';
import { useAPI } from "../../hooks/useApi";

const ChatList = ({ onChatSelected, onCreateGroup }) => {
  const { apiFetch, user } = useAPI();
  const [chats, setChats] = useState([]);
  const firstLoad = useRef(true);

  const fetchChats = async () => {
    const response = await apiFetch(`/chats/byUserId/${user.sub}`);
    const data = await response.json();

    const chatsWithNames = await Promise.all(data.map(async (chat) => {
      if (chat.isPrivate) {
        const titleResponse = await apiFetch(`/chats/${chat.id}/title`);
        const titleData = await titleResponse.json();

        const messageResponse = await apiFetch(`/chats/${chat.id}/lastMessage`);
        const messageText = await messageResponse.text();
        const messageData = messageText.trim() ? JSON.parse(messageText) : "";

        return { ...chat, title: titleData.title, lastMessage: messageData };
      }
      return chat;
    }));

    chatsWithNames.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));

    const prevUpdates = chats.map(c => ({ id: c.id, updateTime: c.updateTime }));
    const newUpdates = chatsWithNames.map(c => ({ id: c.id, updateTime: c.updateTime }));

    const hasChanges =
      prevUpdates.length !== newUpdates.length ||
      prevUpdates.some((prev, i) => prev.id !== newUpdates[i].id || prev.updateTime !== newUpdates[i].updateTime);

    if (hasChanges) {
      setChats(chatsWithNames);
    }

    if (firstLoad.current && chatsWithNames.length > 0) {
      onChatSelected(chatsWithNames[0].id);
      firstLoad.current = false;
    }
  };

  useEffect(() => {
    fetchChats();

    const interval = setInterval(() => {
      fetchChats();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles["chat-platform"]}>
      <div className={styles["search-block"]}>
        <input
          type="search"
          className={styles["chat-search"]}
          placeholder="Search"
        />

        <button
          className={styles["create-group"]}
          onClick={onCreateGroup}
        >
        </button>

      </div>

      <div className={styles["groups-block"]}>
        <div className={styles.text1}>Groups:</div>
        <div className={styles.groups}>
          {chats.map((chat) =>
            !chat.isPrivate ? <GroupChatItem key={chat.id} {...chat} /> : null
          )}
        </div>
      </div>

      <div className={styles["chats-block"]}>
        <div className={styles.text2}>Chats:</div>
        <div className={styles["chats-array"]}>
          {chats.map((chat) =>
            chat.isPrivate ? <PrivateChatItem key={chat.id} onChatSelected={onChatSelected} {...chat} /> : null
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
