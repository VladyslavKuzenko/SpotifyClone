import { useEffect, useState } from "react";
import styles from "./ChatPage.module.css";
import ChatList from './ChatList';
import MessageItem from './MessageItem';
import MessageInputField from './MessageInputField';
import { useNavigate } from "react-router-dom";

import UpperContent from "./UpperContent";
import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../../hooks/useApi";

const ChatPage = () => {
    const { user, isLoading } = useAuth0();
    const { apiFetch } = useAPI();
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);
      const navigate = useNavigate();

    const fetchChat = async (id) => {
        const response = await apiFetch(`/chats/${id}`);
        const text = await response.text();
        if (!text) return;
        const data = JSON.parse(text);
        setCurrentChat(data);
    };

    const fetchMessages = async (id) => {
        const response = await apiFetch(`/messages/byChatId/${id}`);
        const text = await response.text();
        if (!text) return;
        const data = JSON.parse(text);

        const lastNew = data[data.length - 1]?.sentDateTime;
        const lastOld = messages[messages.length - 1]?.sentDateTime;

        if (lastNew !== lastOld) {
            setMessages(data);
        }

        console.log(messages);
        
    };

    useEffect(() => {
        if (chatId !== null && chatId !== -1 && !isLoading) {
            fetchChat(chatId);
            fetchMessages(chatId);
        }
    }, [chatId, isLoading]);

    useEffect(() => {
        if (chatId === null || chatId === -1) return;

        const interval = setInterval(() => {
            fetchMessages(chatId);
        }, 5000);

        return () => clearInterval(interval);
    }, [chatId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    
    return (

        <div className={styles.container}>
                <div className={styles["chat-back"]}> 
                    <button className={styles["chat-back-btn"]}  onClick={() => navigate("/")}></button>
                </div>

            <div className={styles["right-side"]}>
                <ChatList onChatSelected={setChatId} />
                <div className={styles["chat-messages"]}>
                    <div className={styles["upper-side"]}>
                        <UpperContent chat={currentChat} />
                    </div>
                    <div className={styles["middle-side"]}>
                        {messages.map((msg) =>
                            <MessageItem
                                key={msg.id}
                                message={msg}
                                isFromSender={msg.user?.id === user.sub}
                            />
                        )}
                    </div>
                    <MessageInputField chatId={currentChat?.id} onSend={() => fetchMessages(chatId)} />

                </div>
            </div>
        </div>
    );
};

export default ChatPage;
