import React, { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";
import axios from "axios";
import { API_URL } from "../../js/properties/properties";
import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../../hooks/useApi";
import { handleUploadFile } from "../../js/functions/functions";

const NewPost = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("newpost");
  const [selectedPrivacy, setSelectedPrivacy] = useState(null);
  const [selectedComments, setSelectedComments] = useState(null);
  const [fileStory, setFileStory] = useState(null);
  const [filesPost, setFilesPost] = useState([]);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { user, isLoading } = useAuth0();
  const { apiAxiosPost, apiFetch } = useAPI();
  const fileStoryInputRef = useRef(null);
  const filePostInputRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const submiteStories = async () => {
    // console.log("File for story:", fileStory);
    console.log("START !!!!!!!!!!!!!!!!!!!!!!!");
    const resultStory = {
      user: { id: user.sub },
      mediaType: fileStory.type.startsWith("image/") ? "IMAGE" : "VIDEO",
      mediaUrl: " ",
      likesCount: 0,
      viewsCount: 0,
    };

    console.log("/story");
    const response = await apiFetch("/story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultStory),
    });
    console.log("POST SUCCESS");
    const story = await response.json();

    console.log("/story/upload");
    const storyImgUrl = await handleUploadFile(
      story,
      fileStory,
      apiAxiosPost,
      "/story/upload/"
    );

    story.mediaUrl = storyImgUrl;
    console.log("Story uploaded:", story.mediaUrl);
    const responseUpdate = await apiFetch(`/story/${story.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(story),
    });
    onClose();

    if (!responseUpdate.ok) {
      alert("Помилка при оновленні історії: " + responseUpdate.statusText);
    }
  };

  const submitePost = async () => {
    setIsUploading(true);

    const resultPost = {
      user: { id: user.sub },
      description: description,
      likesCount: 0,
      viewsCount: 0,
      commentsCount: 0,
      repostsCount: 0,
      contents: [],
    };

    const response = await apiFetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultPost),
    });

    const post = await response.json();

    for (const file of filesPost) {
      const postImgUrl = await handleUploadFile(
        post,
        file,
        apiAxiosPost,
        "/posts/upload/"
      );
      post.contents.push({
        mediaType: file.type.startsWith("image/") ? "IMAGE" : "VIDEO",
        mediaUrl: postImgUrl,
        post: { id: post.id },
      });
    }
    console.log("Post uploaded:", post.contents);
    const responseUpdate = await apiFetch(`/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    onClose();

    if (!responseUpdate.ok) {
      alert("Помилка при оновленні посту: " + responseUpdate.statusText);
    }
  };

  const handlePrivacyChange = (value) => {
    setSelectedPrivacy((prev) => (prev === value ? null : value));
  };

  const handleCommentsChange = (value) => {
    setSelectedComments((prev) => (prev === value ? null : value));
  };

  const handleRemoveFile = (fileToRemove) => {
    setFilesPost(filesPost.filter((file) => file !== fileToRemove));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["post-modal-overlay"]}>
      {isUploading && (
        <div className={styles["upload-modal"]}>
          <div className={styles["upload-spinner"]}></div>
          <div className={styles["upload-text"]}>Uploading...</div>
        </div>
      )}

      <div
        className={styles["post-modal-window"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["post-modal-content"]}>
          <div className={styles["post-left"]}>
            <div className={styles["newpost-stories"]}>
              <button
                className={`${styles["newpost-text"]} ${activeTab === "newpost" ? styles["active-tab"] : ""
                  }`}
                onClick={() => setActiveTab("newpost")}
              >
                New post
              </button>
              <button
                className={`${styles["stories-text"]} ${activeTab === "stories" ? styles["active-tab"] : ""
                  }`}
                onClick={() => setActiveTab("stories")}
              >
                Stories
              </button>
            </div>

            {activeTab === "newpost" && (
              <>
                <div className={styles["location-mention"]}>
                  <button className={styles["location"]}>Add location</button>
                  <button
                    className={styles["at-gallery"]}
                    onClick={() => filePostInputRef.current.click()}
                  >
                    Add file
                  </button>
                </div>

                <div className={styles["share-thoughts-plat"]}>
                  <textarea
                    className={styles["share-thoughts"]}
                    placeholder="Share your thoughts..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className={styles["attributes"]}>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={filePostInputRef}
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files);
                      if (filesPost.length + newFiles.length > 6) return;
                      setFilesPost([...filesPost, ...newFiles]);
                    }}
                    accept="image/*,video/*"
                    multiple
                  />

                  {filesPost.length > 0
                    ? filesPost.map((file) => (
                      <div key={file.name} style={{ position: "relative" }}>
                        {file.type.startsWith("image/") ? (
                          <img
                            className={styles["preview-image1"]}
                            src={URL.createObjectURL(file)}
                            alt="preview"
                          />
                        ) : (
                          <video
                            className={styles["preview-image1"]}
                            src={URL.createObjectURL(file)}
                            controls
                          />
                        )}
                        <button
                          onClick={() => handleRemoveFile(file)}
                          className={styles["pomh-close"]}
                        >
                          ×
                        </button>
                      </div>
                    ))
                    : ""}
                </div>


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
                    ref={fileStoryInputRef}
                    onChange={(e) => setFileStory(e.target.files[0])}
                    accept="image/*,video/*"
                  />
                  <button
                    className={styles["add-stories"]}
                    onClick={() => fileStoryInputRef.current.click()}
                  >
                    {fileStory ? (
                      <img
                        className={styles["preview-image"]}
                        src={URL.createObjectURL(fileStory)}
                        alt="preview"
                      />
                    ) : (
                      "Choose photo"
                    )}
                  </button>
                </div>
                
                <div className={styles["post-stories"]}>
                  <button
                    className={styles["post-stories-btn"]}
                    onClick={submiteStories}
                    disabled={isUploading}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>

          {activeTab === "newpost" && (
            <div className={styles["post-right"]}>
              <button className={styles["post-close-button"]} onClick={onClose}>
                ×
              </button>

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

              <button
                className={styles["post-modal"]}
                onClick={submitePost}
                disabled={isUploading}
              >
                Post1
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPost;
