// import React from "react";
// import styles from "./main.module.css";

// export default function CommentItem({ comment, onClose }) {
//   return (
//     // бекдроп
//     <div
//       className={styles.backdrop}
//       onClick={onClose} // клік по фону — закрити
//     >
//       {/* сама модалка */}
//       <div
//         className={styles.chatMessage1}
//         onClick={(e) => e.stopPropagation()} // зупиняємо спливання
//       >
//         <img className={styles.avatar1} src={comment.user.avatarImgUrl}/>
//         <div className={styles.messageContent1}>
//           <div className={styles.messageLine1}>
//             <span className={styles.username1}>{comment.user.username}</span>
//             <span className={styles.message1}>
//               {comment.text}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from "react";
import styles from "./main.module.css";

export default function CommentItem({ comment }) {
  return (
    <div className={styles.chatMessage1}>
      <img className={styles.avatar1} src={comment.user.avatarImgUrl} alt="" />
      <div className={styles.messageContent1}>
        <div className={styles.messageLine1}>
          <span className={styles.username1}>{comment.user.username}</span>
          <span className={styles.message1}>{comment.text}</span>
        </div>
      </div>
    </div>
  );
}
