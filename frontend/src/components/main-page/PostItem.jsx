import { useEffect, useState } from "react";
import styles from "./main.module.css";
import { useAPI } from "../../hooks/useApi";
import CommentItem from "./CommentItem";
import { isPostLikedFunc } from "../../js/functions/functions";

// --- Функції для форматування дати ---

function formatPostDate(postDateString) {
  const postDate = new Date(postDateString);
  const now = new Date();
  const diffMs = now - postDate;

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffSeconds < 60) {
    return `${diffSeconds} ${getSecondWord(diffSeconds)} тому`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} ${getMinuteWord(diffMinutes)} тому`;
  } else if (diffHours < 24) {
    return `${diffHours} ${getHourWord(diffHours)} тому`;
  } else if (diffDays < 31) {
    return `${diffDays} ${getDayWord(diffDays)} тому`;
  } else {
    return formatFullDate(postDate);
  }
}

function getSecondWord(n) {
  if (n % 10 === 1 && n % 100 !== 11) return "секунду";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100))
    return "секунди";
  return "секунд";
}

function getMinuteWord(n) {
  if (n % 10 === 1 && n % 100 !== 11) return "хвилину";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100))
    return "хвилини";
  return "хвилин";
}

function getHourWord(n) {
  if (n % 10 === 1 && n % 100 !== 11) return "годину";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100))
    return "години";
  return "годин";
}

function getDayWord(n) {
  if (n % 10 === 1 && n % 100 !== 11) return "день";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100))
    return "дні";
  return "днів";
}

function formatFullDate(date) {
  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year} року`;
}

// --- Компонент PostItem ---

export default function PostItem({ post }) {
  const [isPostLiked, setIsPostLiked] = useState();
  const { user, apiFetch } = useAPI();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = post.contents || [];

  const hasDescription = post.description && post.description.trim() !== "";

  const [pomhIsModalOpen, setPomhIsModalOpen] = useState(false);
  const [pomhModalImageUrl, setPomhModalImageUrl] = useState("");
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const openDiscussion = () => setIsDiscussionOpen(true);
  const closeDiscussion = () => setIsDiscussionOpen(false);

  const fetchComments = async () => {
    const response = await apiFetch(`/comments/byPostId/${post.id}`);
    const data = await response.json();
    setComments(data);
  };

  const submiteUserLike = async () => {
    const response = await apiFetch(`/users/post-like/${post.id}/${user.sub}`, {
      method: isPostLiked ? "DELETE" : "POST",
    });
    if (response.ok) {
      const newValueIsPostLiked = !isPostLiked;
      setIsPostLiked(newValueIsPostLiked);
      if (newValueIsPostLiked) post.likesCount += 1;
      else post.likesCount -= 1;
      console.log("Everything is ok");
    } else {
      console.error("Failed to like/unlike the post");
    }
  };

  const submiteComment = async () => {
    const resultComment = {
      user: { id: user.sub },
      post: { id: post.id },
      text: comment,
      createdAt: new Date().toISOString(),
    };

    const response = await apiFetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultComment),
    });

    if (response.ok) {
      const data = await response.json();
      const responseComment = await apiFetch(`/comments/${data.id}`);
      const newComment = await responseComment.json();
      setComments([...comments, newComment]);
      setComment("");
      console.log("Everything is ok");
    } else {
      console.error("Failed to like/unlike the post");
    }
  };

  const openPomhModal = (url) => {
    setPomhModalImageUrl(url);
    setPomhIsModalOpen(true);
  };
  const closePomhModal = () => {
    setPomhIsModalOpen(false);
    setPomhModalImageUrl("");
  };

  const changeImage = (direction, total) => {
    setCurrentImageIndex((prev) => {
      const currentIndex = prev;
      const nextIndex =
        direction === "next"
          ? Math.min(currentIndex + 1, total - 1)
          : Math.max(currentIndex - 1, 0);
      return nextIndex;
    });
  };

  useEffect(() => {
    const fetchIsPostLiked = async () => {
      setIsPostLiked(await isPostLikedFunc(post, user, apiFetch));
    };
    fetchIsPostLiked();
    fetchComments();
  }, []);

  return (
    <>
      <div className={styles.main} key={post.id}>
        <div className={styles["post-item"]}>
          <div className={styles["post-content"]}>
            <div className={styles["upper-content"]}>
              <div className={styles["post-ava-plat"]}>
                <img
                  className={styles["post-ava"]}
                  src={post.user.avatarImgUrl}
                  alt=""
                />
              </div>
              <div className={styles["name-time"]}>
                <div className={styles["post-author"]}>
                  {post.user.username}
                </div>
                <div className={styles["post-time"]}>
                  {formatPostDate(post.createdAt)}
                </div>
              </div>
              <div className={styles["like-coment-repost"]}>
                <div
                  className={
                    isPostLiked
                      ? styles["post-like-btn-active"]
                      : styles["post-like"]
                  }
                  onClick={submiteUserLike}
                >
                  <div className={styles["post-wrap"]}>
                    <img
                      src={
                        isPostLiked
                          ? "/images/heartred.svg"
                          : "/images/heart.svg"
                      }
                      alt="Like"
                      className={styles["post-like-btn"]}
                    />
                    <div className={styles["likes-count"]}>
                      {post.likesCount}
                    </div>
                  </div>
                </div>

                {post.isCommentsOpen && (
                  <div className={styles["post-coment"]}>
                    <div className={styles["post-wrap"]}>
                      <button
                        className={styles["post-coment-btn"]}
                        onClick={openDiscussion}
                      ></button>
                      <div className={styles["coment-count"]}>
                        {comments.length}
                      </div>
                    </div>
                  </div>
                )}

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
                    onClick={() => changeImage("prev", images.length)}
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
                        className={`${styles["prl-dot"]} ${
                          index === currentImageIndex
                            ? styles["prl-active"]
                            : ""
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>

                {images.length > 1 && currentImageIndex < images.length - 1 && (
                  <button
                    className={`${styles["prl-slider-btn"]} ${styles["prl-right"]}`}
                    onClick={() => changeImage("next", images.length)}
                  ></button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles["post-location"]}>
          <div className={styles["location-icon"]}> </div>
          <div className={styles["location-place"]}>Turkey, Istanbul</div>
        </div>

        {/*} <div className={styles["post-comment"]}>
          <textarea
            className={styles["send-comment"]}
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
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
            <button className={styles["publish-btn"]} onClick={submiteComment}>
              Publish
            </button>
          </div>
        </div>*/}

        {/*<div className={styles["see-coments"]} onClick={openDiscussion}>
          View discussion (12)
        </div>*/}
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

      {isDiscussionOpen && (
        <div className={styles["discussion-modal"]} onClick={closeDiscussion}>
          <div
            className={styles["discussion-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["discussion-header"]}>
              <div className={styles["post-comment"]}>
                <textarea
                  className={styles["send-comment"]}
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={1}
                  onInput={(e) => {
                    const target = e.target;
                    target.style.height = "auto";
                    target.style.height =
                      Math.min(target.scrollHeight, 100) + "px";
                  }}
                  onBlur={(e) => {
                    const target = e.target;
                    if (target.value.trim() === "") {
                      target.style.height = "31px";
                    }
                  }}
                />
                <div className={styles["post-comment-btn"]}>
                  <button
                    className={styles["publish-btn"]}
                    onClick={submiteComment}
                  >
                    Publish
                  </button>
                </div>
              </div>
              {/*<button onClick={closeDiscussion} className={styles["close-btn"]}>
                ✕
              </button>*/}
            </div>
            <div className={styles["discussion-body"]}>
              {[...comments].reverse().map((comnt) => (
                <CommentItem key={comnt.id} comment={comnt} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
