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
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const [visibleCount, setVisibleCount] = useState(15);

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
    const initialIndexes = {};
    data.forEach((post) => {
      initialIndexes[post.id] = 0;
    });
    setCurrentImageIndexes(initialIndexes);
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

  const changeImage = (postId, direction, total) => {
    setCurrentImageIndexes((prev) => {
      const currentIndex = prev[postId] || 0;
      const nextIndex =
        direction === "next"
          ? Math.min(currentIndex + 1, total - 1)
          : Math.max(currentIndex - 1, 0);
      return { ...prev, [postId]: nextIndex };
    });
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  const totalPosts = [...posts];
  const start = Math.max(totalPosts.length - visibleCount, 0);
  const visiblePosts = totalPosts.slice(start); // без reverse
  const reversedVisiblePosts = [...visiblePosts].reverse(); // для відображення знизу вгору

  return (
    <>
      <div className={styles["posts-container"]}>
        {reversedVisiblePosts.map((post) => {
          const currentImageIndex = currentImageIndexes[post.id] || 0;
          const images = post.contents || [];
          const hasDescription = post.description && post.description.trim() !== "";

          return (
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

                  {hasDescription && (
                    <div className={styles["middle-content"]}>
                      <div className={styles["text-content"]}>{post.description}</div>
                    </div>
                  )}

                  {images.length > 0 && (
                    <div className={styles["post-photos-container"]}>
                      {images.length > 1 && currentImageIndex > 0 && (
                        <button
                          className={`${styles["prl-slider-btn"]} ${styles["prl-left"]}`}
                          onClick={() =>
                            changeImage(post.id, "prev", images.length)
                          }
                        ></button>
                      )}

                      <div className={styles["prl-inner-wrapper"]}>
                        <div className={styles["prl-photo-wrapper"]}>
                          <img
                            className={styles["prl-preview-image"]}
                            src={images[currentImageIndex].mediaUrl}
                            alt="Post content"
                            onClick={() =>
                              openPomhModal(images[currentImageIndex].mediaUrl)
                            }
                          />
                        </div>

                        <div className={styles["prl-dot-container"]}>
                          {images.map((_, index) => (
                            <span
                              key={index}
                              className={`${styles["prl-dot"]} ${index === currentImageIndex ? styles["prl-active"] : ""
                                }`}
                            ></span>
                          ))}
                        </div>
                      </div>

                      {images.length > 1 &&
                        currentImageIndex < images.length - 1 && (
                          <button
                            className={`${styles["prl-slider-btn"]} ${styles["prl-right"]}`}
                            onClick={() =>
                              changeImage(post.id, "next", images.length)
                            }
                          ></button>
                        )}
                    </div>
                  )}
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

              <div className={styles["see-coments"]}>View discussion (12)</div>
            </div>
          );
        })}

        {/* КНОПКА В НИЗУ */}
        {visibleCount < posts.length && (
          <div className={styles["show-more-container"]}>
            <button
              className={styles["show-more-btn"]}
              onClick={handleShowMore}
            >
              Show more
            </button>
          </div>
        )}
      </div>

      {pomhIsModalOpen && (
        <div className={styles["pomh-modal-overlay"]} onClick={closePomhModal}>
          <div
            className={styles["pomh-modal-content"]}
            onClick={(e) => e.stopPropagation()}
          >
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
