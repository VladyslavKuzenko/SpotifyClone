import styles from "./ChatPage.module.css";

const GroupChatItem = ({ title, id, onChatSelected, lastMessage }) => {
  const selectChat = () => {
    onChatSelected(id);
  };

  let previewText = "";

  try {
    const contentObj = JSON.parse(lastMessage?.contentJson || "{}");

    if ("text" in contentObj) {
      previewText = contentObj.text;
    } else if ("post" in contentObj) {
      // optionally set previewText = "[Post]"
    } else if ("music" in contentObj) {
      // optionally set previewText = "[Music]"
    }
  } catch (e) {
    console.error("Invalid JSON in message.contentJson:", lastMessage?.contentJson);
    previewText = "";
  }

  return (
    <div className={styles["group-icon"]} onClick={selectChat}>
      <div className={styles["group-circle"]}></div>
      <div className={styles["group-name"]}>{title}</div>
    </div>
  );
};

export default GroupChatItem;
