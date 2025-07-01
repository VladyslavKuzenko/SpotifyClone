import React, { useState, useEffect } from "react";
import styles from "./main.module.css";

const NewPost = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("newpost"); // "newpost" або "stories"

  // Стан для чекбоксів New post
  const [selectedPrivacy, setSelectedPrivacy] = useState(null);
  const [selectedComments, setSelectedComments] = useState(null);

  useEffect(() => {
    // Блокуємо скрол сторінки при відкритій модалці
    document.body.style.overflow = "hidden";
    return () => {
      // Відновлюємо скрол при закритті
      document.body.style.overflow = "";
    };
  }, []);

  const handlePrivacyChange = (name) => {
    setSelectedPrivacy((prev) => (prev === name ? null : name));
  };

  const handleCommentsChange = (name) => {
    setSelectedComments((prev) => (prev === name ? null : name));
  };

  const isPrivacyDisabled = (name) => selectedPrivacy !== null && selectedPrivacy !== name;
  const isCommentsDisabled = (name) => selectedComments !== null && selectedComments !== name;

  return (
    <div className={styles["post-modal-overlay"]}>
      <div className={styles["post-modal-window"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["post-modal-content"]}>
          <div className={styles["post-left"]}>
            <div className={styles["newpost-stories"]}>
              <button
                className={`${styles["newpost-text"]} ${activeTab === "newpost" ? styles["active-tab"] : ""}`}
                onClick={() => setActiveTab("newpost")}
              >
                New post
              </button>
              <button
                className={`${styles["stories-text"]} ${activeTab === "stories" ? styles["active-tab"] : ""}`}
                onClick={() => setActiveTab("stories")}
              >
                Stories
              </button>
            </div>

            {activeTab === "newpost" && (
              <>
                <div className={styles["location-mention"]}>
                  <button className={styles["location"]}>Location</button>
                  <button className={styles["mention"]}>Mention</button>
                </div>

                <div className={styles["share-thoughts-plat"]}>
                  <textarea
                    className={styles["share-thoughts"]}
                    placeholder="Share your thoughts..."
                    rows={4}
                  />
                </div>

                <div className={styles["attributes"]}>
                  <button className={styles["at-music"]}>Music</button>
                  <button className={styles["at-gallery"]}>Gallery</button>
                  <button className={styles["at-video"]}>Video</button>
                  <button className={styles["at-document"]}>Document</button>
                  <button className={styles["at-add-tag"]}>Add tag</button>
                </div>

                <div className={styles["tag-container"]}>
                  {Array.from({ length: 15 }).map((_, index) => (
                    <button key={index} className={styles["tag-item"]}>
                      Tag {index + 1}
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeTab === "stories" && (
              <div className={styles["stories-design"]}>
                <button className={styles["post-close-button"]} onClick={onClose}>
                ×
              </button>
                <div className={styles["file-stories"]}>
                  <button className={styles["choose-file"]}>Choose file</button>
                  <button className={styles["add-stories"]}>Add stories</button>
                </div>
                <div className={styles["post-stories"]}>
                  <button className={styles["post-stories-btn"]}>Post</button>
                </div>
              </div>
            )}
          </div>

          {activeTab === "newpost" && (
            <div className={styles["post-right"]}>
              <button className={styles["post-close-button"]} onClick={onClose}>
                ×
              </button>

              <div className={styles["privacy-container"]}>
                <div className={styles["privacy-text"]}>Privacy</div>

                <label
                  className={`${styles["check-text"]} ${isPrivacyDisabled("public") ? styles["disabled-label"] : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPrivacy === "public"}
                    onChange={() => handlePrivacyChange("public")}
                    disabled={isPrivacyDisabled("public")}
                    className={styles["public"]}
                  />
                  <span>Public</span>
                </label>

                <label
                  className={`${styles["check-text"]} ${isPrivacyDisabled("friends") ? styles["disabled-label"] : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPrivacy === "friends"}
                    onChange={() => handlePrivacyChange("friends")}
                    disabled={isPrivacyDisabled("friends")}
                    className={styles["friends"]}
                  />
                  <span>Friends</span>
                </label>

                <label
                  className={`${styles["check-text"]} ${isPrivacyDisabled("privacy") ? styles["disabled-label"] : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPrivacy === "privacy"}
                    onChange={() => handlePrivacyChange("privacy")}
                    disabled={isPrivacyDisabled("privacy")}
                    className={styles["privacy"]}
                  />
                  <span>Privacy</span>
                </label>
              </div>

              <div className={styles["comments"]}>
                <div className={styles["comments-text"]}>Comments</div>

                <label
                  className={`${styles["check-text"]} ${isCommentsDisabled("open-comments") ? styles["disabled-label"] : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedComments === "open-comments"}
                    onChange={() => handleCommentsChange("open-comments")}
                    disabled={isCommentsDisabled("open-comments")}
                    className={styles["open-comments"]}
                  />
                  <span>Open</span>
                </label>

                <label
                  className={`${styles["check-text"]} ${isCommentsDisabled("closed-comments") ? styles["disabled-label"] : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedComments === "closed-comments"}
                    onChange={() => handleCommentsChange("closed-comments")}
                    disabled={isCommentsDisabled("closed-comments")}
                    className={styles["closed-comments"]}
                  />
                  <span>Closed</span>
                </label>
              </div>

              <button className={styles["post-modal"]}>Post</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPost;
