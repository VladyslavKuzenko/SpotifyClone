import styles from "./ChatPage.module.css";

const MessageItem = ({ message, isFromSender }) => {
  let content = null;

  try {
    const contentObj = JSON.parse(message.contentJson);

    if ("text" in contentObj) {
      content = contentObj.text;
    } else if ("post" in contentObj) {

    } else if ("music" in contentObj) {

    }
  } catch (e) {
    console.error("Invalid JSON in message.contentJson:", message.contentJson);
    content = message.contentJson;
  }

  return (
    <div className={isFromSender ? styles["my-message"] : styles["user-message"]}>
      {content}
    </div>
  );
};

export default MessageItem;
