import { useState, useRef, useEffect } from "react";
import styles from "./ChatPage.module.css";
import { useAPI } from "../../hooks/useApi";

const UpperContent = ({ chat }) => {
    const { apiFetch } = useAPI();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("images");
    const [title, setTitle] = useState("...");
    const modalRef = useRef(null);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const fetchTitle = async () => {
        if (chat !== null) {
            const response = await apiFetch(`/chats/${chat.id}/title`);
            const data = await response.json();
            setTitle(data.title);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                !event.target.closest(`.${styles["user-btn"]}`)
            ) {
                setIsModalOpen(false);
            }
        };

        fetchTitle();

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [chat]);

    return (
        <div className={styles["upper-content"]}>
            <div className={styles["user-ava"]}></div>
            <div className={styles["user-ns"]}>
                <div className={styles["user-name"]}>{title}</div>
                <div className={styles["user-status"]}>Online</div>
            </div>
            <div className={styles["user-listening"]}>
                Listening to: Timeless – The Weeknd
                <div className={styles["split1"]}>
                </div>
                </div>
<div className={styles["user-btn"]} onClick={toggleModal}>
                        {isModalOpen ? "∧" : "∨"}
                    </div>
              
                    

                {isModalOpen && (
                    <div ref={modalRef} className={styles["user-modal"]}>
                        <div className={styles["btn-container"]}>
                            <button
                                className={`${styles["btn-images"]} ${activeTab === "images" ? styles.active : ""
                                    }`}
                                onClick={() => setActiveTab("images")}
                            >
                                Images
                            </button>
                            <button
                                className={`${styles["btn-music"]} ${activeTab === "music" ? styles.active : ""
                                    }`}
                                onClick={() => setActiveTab("music")}
                            >
                                Music
                            </button>
                        </div>

                        <div className={styles["content-area"]}>
                            {activeTab === "images" && (
                                <div className={styles["images-array"]}>

                                    <div className={styles["images-item"]}>
                                        <div className={styles["images-photo"]}></div>
                                        <div className={styles["images-name"]}>Song Name</div>
                                        <div className={styles["images-artist"]}>Artist </div>
                                    </div>
                                    <div className={styles["images-item"]}>
                                        <div className={styles["images-photo"]}></div>
                                        <div className={styles["images-name"]}>Song Name</div>
                                        <div className={styles["images-artist"]}>Artist </div>
                                    </div>
                                    <div className={styles["images-item"]}>
                                        <div className={styles["images-photo"]}></div>
                                        <div className={styles["images-name"]}>Song Name</div>
                                        <div className={styles["images-artist"]}>Artist </div>
                                    </div>
                                    <div className={styles["images-item"]}>
                                        <div className={styles["images-photo"]}></div>
                                        <div className={styles["images-name"]}>Song Name</div>
                                        <div className={styles["images-artist"]}>Artist </div>
                                    </div>

                                    <div className={styles["images-item"]}>
                                        <div className={styles["images-photo"]}></div>
                                        <div className={styles["images-name"]}>Song Name</div>
                                        <div className={styles["images-artist"]}>Artist </div>
                                    </div>

                                    <div className={styles["images-item"]}>
                                        <div className={styles["images-photo"]}></div>
                                        <div className={styles["images-name"]}>Song Name</div>
                                        <div className={styles["images-artist"]}>Artist </div>
                                    </div>

                                    <div className={styles["images-item"]}>
                                        <div className={styles["images-photo"]}></div>
                                        <div className={styles["images-name"]}>Song Name</div>
                                        <div className={styles["images-artist"]}>Artist </div>
                                    </div>

                                    <div className={styles["images-item"]}>
                                        <div className={styles["images-photo"]}></div>
                                        <div className={styles["images-name"]}>Song Name</div>
                                        <div className={styles["images-artist"]}>Artist </div>
                                    </div>

                                </div>
                            )}

                            {activeTab === "music" && (
                                <div className={styles["music-array"]}>Тут має бути твій контент для music</div>
                            )}
                        </div>
                    </div>
                )}
            </div>

    );
};


export default UpperContent;
