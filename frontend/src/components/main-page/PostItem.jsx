import React, { useEffect, useState } from "react";
import styles from "./main.module.css";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import { isLiked } from "../../js/functions/functions";

export default function PostItem() {
  const [posts, setPosts] = useState([]);
  const { apiFetch } = useAPI();
  const { user, isLoading } = useAuth0();

  const fetchPosts = async () => {
    const response = await apiFetch("/posts");
    const data = await response.json();
    setPosts(data);
    console.log("Posts fetched:", data);
  };

  const submiteUserLike = async (post) => {
    const isPostlIked = await isLiked(post, user, apiFetch);
    console.log("isLiked in Submite",isPostlIked);
    const response = await apiFetch(`/users/like/${post.id}/${user.sub}`, {
      method: isPostlIked ? "DELETE" : "POST",
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
  return (
    <>
      {posts?.map((post) => (
        <div className={styles.main}>
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
                    className={isLiked(post, user, apiFetch)?styles["post-like-btn-active"]:styles["post-like"]}
                    onClick={() => {
                      submiteUserLike(post);
                    }}
                  >
                    <button className={styles["post-like-btn"]}></button>
                    <div className={styles["likes-count"]}>
                      {post.likesCount}
                    </div>
                  </div>

                  <div className={styles["post-coment"]}>
                    <button className={styles["post-coment-btn"]}></button>
                    <div className={styles["coment-count"]}>
                      {post.commentsCount}
                    </div>
                  </div>

                  <div className={styles["post-repost"]}>
                    <button className={styles["post-repost-btn"]}></button>
                    <div className={styles["repost-count"]}>
                      {post.repostsCount}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles["middle-content"]}>
                <div className={styles["text-content"]}>{post.description}</div>
              </div>

              <div className={styles["post-photos-container"]}>
                {post.contents?.map((content) => (
                  <>
                    <div className={styles["post-photo"]} key={content.id}>
                      <img
                        className={styles["preview-image"]}
                        src={content.mediaUrl}
                        alt="Post content"
                      />
                    </div>
                  </>
                ))}
                {/*    <div className={styles["post-photo"]}></div>
                <div className={styles["post-photo"]}></div>
                <div className={styles["post-photo"]}></div>
                <div className={styles["post-photo"]}></div>
                <div className={styles["post-photo"]}></div>
                <div className={styles["post-photo"]}></div> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
