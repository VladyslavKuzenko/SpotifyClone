import styles from "./ChatPage.module.css";

const PrivateChatItem = ({ title, id, onChatSelected, lastMessage }) => {
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

  return (
    <div className={styles["chat-item"]} onClick={selectChat}>
      <div className={styles["ava-circle-place"]}>
        <div className={styles["ava-circle"]}>
          <div className={styles.status}></div>
        </div>
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
