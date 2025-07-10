import React, { useEffect, useState } from "react";
import styles from "./main.module.css";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import { isLiked } from "../../js/functions/functions";

export default function PostItem() {

  const [posts, setPosts] = useState([]);
  const { apiFetch } = useAPI();
  const { user, isLoading } = useAuth0();

  const [pomhIsModalOpen, setPomhIsModalOpen] = useState(false);
  const [pomhModalImageUrl, setPomhModalImageUrl] = useState("");

  const openPomhModal = (url) => {
    setPomhModalImageUrl(url);
    setPomhIsModalOpen(true);
  };

  const closePomhModal = () => {
    setPomhIsModalOpen(false);
    setPomhModalImageUrl("");
  };

  const fetchPosts = async () => {
    const response = await apiFetch("/posts");
    const data = await response.json();
    setPosts(data);
  };

  const submiteUserLike = async (post) => {
    const isPostLiked = await isLiked(post, user, apiFetch);
    const response = await apiFetch(`/users/like/${post.id}/${user.sub}`, {
      method: isPostLiked ? "DELETE" : "POST",
    });
    if (response.ok) {
      fetchPosts();
    } else {
      console.error("Failed to like/unlike the post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  const getGridStyle = (count) => {
    if (count === 1) return { gridTemplateColumns: "1fr" };
    if (count === 2) return { gridTemplateColumns: "1fr 1fr" };
    if (count === 3) return { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" };
    if (count === 4) return { gridTemplateColumns: "1fr 1fr" };
    if (count === 5 || count === 6) return { gridTemplateColumns: "repeat(3, 1fr)" };
    return { gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" };
  };

  return (
    <>
      {posts?.map((post) => (
        <div className={styles.main} key={post.id}>
          <div className={styles["post-item"]}>
            <div className={styles["post-content"]}>
              <div className={styles["upper-content"]}>
                <div className={styles["post-ava-plat"]}>
                  <div className={styles["post-ava"]}></div>
                </div>
                <div className={styles["name-time"]}>
                  <div className={styles["post-author"]}>
                    {post.user.username}
                  </div>
                  <div className={styles["post-time"]}>10 days ago</div>
                </div>
                <div className={styles["like-coment-repost"]}>
                  <div
                    className={
                      isLiked(post, user, apiFetch)
                        ? styles["post-like-btn-active"]
                        : styles["post-like"]
                    }
                    onClick={() => submiteUserLike(post)}
                  >
                    <div className={styles["post-wrap"]}>
                      <button className={styles["post-like-btn"]}></button>
                      <div className={styles["likes-count"]}>
                        {post.likesCount}
                      </div>
                    </div>
                  </div>

                  <div className={styles["post-coment"]}>
                    <div className={styles["post-wrap"]}>
                      <button className={styles["post-coment-btn"]}></button>
                      <div className={styles["coment-count"]}>
                        {post.commentsCount}
                      </div>
                    </div>
                  </div>

                  <div className={styles["post-repost"]}>
                    <div className={styles["post-wrap"]}>
                      <button className={styles["post-repost-btn"]}></button>
                      <div className={styles["repost-count"]}>
                        {post.repostsCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles["middle-content"]}>
                <div className={styles["text-content"]}>{post.description}</div>
              </div>

              <div
                className={styles["post-photos-container"]}
                style={getGridStyle(post.contents.length)}
              >
                {post.contents?.map((content) => (
                  <div className={styles["post-photo"]} key={content.id}>
                    <img
                      className={styles["preview-image"]}
                      src={content.mediaUrl}
                      alt="Post content"
                      onClick={() => openPomhModal(content.mediaUrl)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles["post-comment"]}>
            <textarea
              className={styles["send-comment"]}
              placeholder="Write a comment..."
              rows={1}
              onInput={(e) => {
                const target = e.target;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, 100) + "px";
              }}
              onBlur={(e) => {
                const target = e.target;
                if (target.value.trim() === "") {
                  target.style.height = "31px";
                }
              }}
            />
            <div className={styles["post-comment-btn"]}>
              <button className={styles["publish-btn"]}>Publish</button>
            </div>
          </div>



        </div>
      ))}

      {/* POMH MODAL */}
      {pomhIsModalOpen && (
        <div className={styles["pomh-modal-overlay"]} onClick={closePomhModal}>
          <div className={styles["pomh-modal-content"]} onClick={(e) => e.stopPropagation()}>
            <img
              src={pomhModalImageUrl}
              alt="Preview"
              className={styles["pomh-modal-image"]}
            />

          </div>
        </div>
      )}
    </>
  );
}
