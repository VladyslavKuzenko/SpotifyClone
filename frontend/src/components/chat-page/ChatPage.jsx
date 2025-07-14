import React from "react";
import styles from "./ChatPage.module.css";
import ChatList from './ChatList';
import MyMessageItem from './MyMessageItem';
import UserMessageItem from './UserMessageItem';
import Footer from './Footer';
import LeftSide from '../main-components/LeftSide';
import { useNavigate } from "react-router-dom";

import UpperContent from "./UpperContent";
const ChatPage = () => {
      const navigate = useNavigate();
    
    return (

        <div className={styles.container}>
                <div className={styles["chat-back"]}> 
                    <button className={styles["chat-back-btn"]}  onClick={() => navigate("/")}></button>
                </div>

            <div className={styles["right-side"]}>


                <ChatList />

                <div className={styles["chat-messages"]}>
                    <div className={styles["upper-side"]}>
                        <UpperContent />
                    </div>

                    <div className={styles["middle-side"]}>
                        {[...Array(12)].map((_, i) => (
                            <React.Fragment key={i}>
                                <MyMessageItem />
                                <UserMessageItem />

                            </React.Fragment>
                        ))}
                    </div>

                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
