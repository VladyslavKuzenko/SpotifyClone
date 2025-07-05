import React, { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";
import axios from "axios";
import { API_URL } from "../../js/properties/properties";
import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../../hooks/useApi";

const NewPost = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("newpost"); // "newpost" або "stories"

  const [selectedPrivacy, setSelectedPrivacy] = useState(null);
  const [selectedComments, setSelectedComments] = useState(null);
  const [file, setFile] = useState(null);
  const { user, isLoading } = useAuth0();
  const { apiAxiosPost, apiFetch } = useAPI();
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const submiteStories = async () => {
    const resultStory = {
      user: { id: user.sub },
      mediaType: file.type.startsWith("image/") ? "IMAGE" : "VIDEO",
      mediaUrl: " ",
      likesCount: 0,
      viewsCount: 0,
    };

    const response = await apiFetch("/story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultStory),
    });
    console.log("POST SUCCESS");
    const story = await response.json();

    const storyImgUrl = await handleUpload(story);

    story.mediaUrl = storyImgUrl;
    console.log("Story uploaded:", story.mediaUrl);
    const responseUpdate = await apiFetch(`/story/${story.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(story),
    });
    if (responseUpdate.ok) {
      alert("Story successfully posted!");
    } else {
      alert("Помилка при оновленні історії: " + responseUpdate.statusText);
    }
  };

  const handleUpload = async (story) => {
    if (!file) return;

    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await apiAxiosPost(`/story/upload/${story.id}`, formData);
      const data = res.data;

      alert("Файл успішно надіслано: " + res.data);

      return data;
    } catch (err) {
      alert("Помилка: " + err.message);
    }
  };

  const handlePrivacyChange = (value) => {
    setSelectedPrivacy((prev) => (prev === value ? null : value));
  };

  const handleCommentsChange = (value) => {
    setSelectedComments((prev) => (prev === value ? null : value));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles["post-modal-overlay"]}>
      <div
        className={styles["post-modal-window"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["post-modal-content"]}>
          <div className={styles["post-left"]}>
            <div className={styles["newpost-stories"]}>
              <button
                className={`${styles["newpost-text"]} ${
                  activeTab === "newpost" ? styles["active-tab"] : ""
                }`}
                onClick={() => setActiveTab("newpost")}
              >
                New post
              </button>
              <button
                className={`${styles["stories-text"]} ${
                  activeTab === "stories" ? styles["active-tab"] : ""
                }`}
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
                  <button className={styles["at-gallery"]}>Gallery</button>
                  {/*<button className={styles["at-gallery"]}>Gallery</button>            
                  <button className={styles["at-music"]}>Music</button>
                  <button className={styles["at-album"]}>Album</button> */}{" "}
                  {/* !!!ДЛЯ АРТИСТА*/}
                </div>

                {/*<div className={styles["tag-container"]}>
                  {Array.from({ length: 15 }).map((_, index) => (
                    <button key={index} className={styles["tag-item"]}>
                      Tag {index + 1}
                    </button>
                  ))}
                </div>*/}
              </>
            )}

            {activeTab === "stories" && (
              <div className={styles["stories-design"]}>
                <button
                  className={styles["post-close-button"]}
                  onClick={onClose}
                >
                  ×
                </button>
                <div className={styles["file-stories"]}>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/* video/* "
                  />
                  <button
                    className={styles["add-stories"]}
                    onClick={() => fileInputRef.current.click()}
                  >
                    {file ? (
                      <img
                        className={styles["preview-image"]}
                        src={URL.createObjectURL(file)}
                        alt="preview"
                      />
                    ) : (
                      "Post"
                    )}
                  </button>
                  {/* <button className={styles["add-stories"]}>Choose photo</button> */}
                </div>
                <div className={styles["post-stories"]}>
                  <button
                    className={styles["post-stories-btn"]}
                    onClick={submiteStories}
                  >
                    Post
                  </button>
                </div>
              </div>
              /*  <div>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={handleUpload}>Завантажити</button>
              </div> */
            )}
          </div>

          {activeTab === "newpost" && (
            <div className={styles["post-right"]}>
              <button className={styles["post-close-button"]} onClick={onClose}>
                ×
              </button>

              <div className={styles["privacy-container"]}>
                <div className={styles["privacy-text"]}>Privacy</div>

                <label className={styles["check-text"]}>
                  <input
                    type="radio"
                    checked={selectedPrivacy === "public"}
                    onChange={() => handlePrivacyChange("public")}
                    className={styles["radio-post"]}
                  />
                  <span>Public</span>
                </label>

                <label className={styles["check-text"]}>
                  <input
                    type="radio"
                    checked={selectedPrivacy === "friends"}
                    onChange={() => handlePrivacyChange("friends")}
                    className={styles["radio-post"]}
                  />
                  <span>Friends</span>
                </label>

                <label className={styles["check-text"]}>
                  <input
                    type="radio"
                    checked={selectedPrivacy === "privacy"}
                    onChange={() => handlePrivacyChange("privacy")}
                    className={styles["radio-post"]}
                  />
                  <span>Privacy</span>
                </label>
              </div>

              <div className={styles["comments"]}>
                <div className={styles["comments-text"]}>Comments</div>

                <label className={styles["check-text"]}>
                  <input
                    type="radio"
                    checked={selectedComments === "open-comments"}
                    onChange={() => handleCommentsChange("open-comments")}
                    className={styles["radio-post"]}
                  />
                  <span>Open</span>
                </label>

                <label className={styles["check-text"]}>
                  <input
                    type="radio"
                    checked={selectedComments === "closed-comments"}
                    onChange={() => handleCommentsChange("closed-comments")}
                    className={styles["radio-post"]}
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
