import React, { useEffect, useState } from "react";
import styles from "./main.module.css";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import { isLiked } from "../../js/functions/functions";

export default function PostItem({ selectedTab }) {
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
    if(isLoading) return;
    var response;
    console.log("FETCH POST. SELECTED TAB: ",selectedTab)
    console.log("FETCH POST. user sub: ",user.sub)


    if (selectedTab==="artists") response = await apiFetch("/posts");
    else if (selectedTab==="friends") {
      response = await apiFetch(`/posts/byFollowing/${user.sub}`);
    } else {
      response = await apiFetch("/posts");
    }

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
  }, [selectedTab,isLoading]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {/* {friends&&<div>TEEEEEEEEEEEST</div>} */}
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

              <div className={styles["post-photos-container"]}>
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
        </div>
      ))}

      {/* POMH MODAL */}
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
