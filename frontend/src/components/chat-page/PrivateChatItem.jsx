import styles from "./ChatPage.module.css";

const PrivateChatItem = ({ title, id, picture, onChatSelected, lastMessage }) => {
  const selectChat = () => {
    onChatSelected(id);
  };

  let previewText = "";
  let previewTime = "";

  try {
    const contentObj = JSON.parse(lastMessage?.contentJson || "{}");
    previewTime = lastMessage.sentDateTime;

    if ("text" in contentObj) {
      previewText = contentObj.text;
    } else if ("post" in contentObj) {

    } else if ("music" in contentObj) {

    }
  } catch (e) {
    console.error("Invalid JSON in message.contentJson:", lastMessage?.contentJson);
    previewText = "";
  }

  const formatTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    if (isToday) {
      return `${hours}:${minutes}`;
    } else {
      const day = date.getDate().toString().padStart(2, "0");
      const month = date.toLocaleString("en-US", { month: "short" });
      return `${day} ${month}, ${hours}:${minutes}`;
    }
  };

  previewTime = formatTime(lastMessage?.sentDateTime);

  return (
    <div className={styles["chat-item"]} onClick={selectChat}>
      <div className={styles["ava-circle-place"]}>
        <img
          className={styles["ava-circle"]}
          src={picture}
          alt=""
        />
      </div>
      <div className={styles["name-message"]}>
        <div className={styles["chat-name"]}>{title}</div>
        <div className={styles["chat-message"]}>{previewText}</div>
      </div>
      <div className={styles["chat-time-plat"]}>
        <div className={styles["chat-time"]}>{previewTime}</div>
      </div>

    </div>
  );
};

export default PrivateChatItem;
