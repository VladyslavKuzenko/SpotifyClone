import React from "react";
import styles from "./main.module.css";

export default function PostItem() {
    return (
        <div className={styles.main}>
            <div className={styles["post-item"]}>
                <div className={styles["post-content"]}>
                    <div className={styles["upper-content"]}>
                        <div className={styles["post-ava-plat"]}>
                            <div className={styles["post-ava"]}></div>
                        </div>
                        <div className={styles["name-time"]}>
                            <div className={styles["post-author"]}>Author`s name very long</div>
                            <div className={styles["post-time"]}>10 days ago</div>
                        </div>
                        <div className={styles["like-coment-repost"]}>
                            <div className={styles["post-like"]}>1999 likes</div>
                            <div className={styles["post-coment"]}>999 comments</div>
                            <div className={styles["post-repost"]}>999 reposts</div>
                        </div>
                    </div>

                    <div className={styles["middle-content"]}>
                        <div className={styles["text-content"]}>
                            Hello!

                            I hope this message finds you well. I wanted to take a moment to introduce myself and share a little bit about who I am. My name is [Your Name], and I’m really excited to connect with you.

                            A bit about me: I am passionate about learning new things and meeting people from different backgrounds. I believe that every person has a unique story to tell, and I enjoy listening and exchanging experiences. In my free time, I love reading books, exploring nature, and trying out new hobbies. Recently, I’ve been interested in improving my skills in [a hobby or skill, e.g., photography, cooking, or programming], which has been both challenging and rewarding.

                            I think it’s important to stay positive and open-minded, especially when facing challenges. Life is full of ups and downs, but each experience teaches us something valuable. I try to approach each day with gratitude and a willingness to grow.

                            I’m also a big fan of traveling and discovering new cultures. Experiencing different ways of life broadens one’s perspective and helps build understanding and empathy. One of my favorite trips was to [a place you visited], where I had the chance to meet wonderful people and see incredible sights.

                            I would love to learn more about you as well — your interests, goals, and what motivates you. If you’re open to it, please feel free to share a little about yourself. I’m looking forward to hearing from you and hopefully building a meaningful connection.

                            Thank you for taking the time to read my message. Wishing you a great day ahead!

                            Best regards,
                            [Your Name]
                        </div>
                    </div>

                    <div className={styles["post-photos-container"]}>
                        <div className={styles["post-photo"]}></div>
                        <div className={styles["post-photo"]}></div>
                        <div className={styles["post-photo"]}></div>
                        <div className={styles["post-photo"]}></div>
                        <div className={styles["post-photo"]}></div>
                        <div className={styles["post-photo"]}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
