import React from "react";
import styles from "./ChatPage.module.css";
import ChatList from './ChatList'
import MyMessageItem from './MyMessageItem'
import UserMessageItem from './UserMessageItem'
import Footer from './Footer'

const ChatPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles["right-side"]}>
                <ChatList />

                <div className={styles["chat-messages"]}>
                    <div className={styles["upper-side"]}>
                        <div className={styles["upper-content"]}>
                            <div className={styles["user-ava"]}></div>
                            <div className={styles["user-ns"]}>
                                <div className={styles["user-name"]}>User Nickname</div>
                                <div className={styles["user-status"]}>Online</div>
                            </div>
                            <div className={styles["user-listening"]}>
                                Listening to: Timeless – The Weeknd
                            </div>
                            <div className={styles["user-btn"]}>∨</div>
                        </div>
                    </div>

                    <div className={styles["middle-side"]}>
                        {[...Array(12)].map((_, i) => (
                            <React.Fragment key={i}>
                                <MyMessageItem />
                                <UserMessageItem />

                            </React.Fragment>
                        ))}
                    </div>

                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
