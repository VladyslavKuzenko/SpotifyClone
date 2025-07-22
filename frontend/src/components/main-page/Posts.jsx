import { useEffect, useState } from "react";
import styles from "./main.module.css";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import PostItem from "./PostItem";

export default function Posts({ selectedTab, userId }) {
  const [posts, setPosts] = useState([]);
  const { apiFetch, user } = useAPI();
  const { isLoading } = useAuth0();

  const [visibleCount, setVisibleCount] = useState(15);

  const fetchPosts = async () => {
    if (isLoading) return;
    let response;
    console.log("fetch posts , selectedTab: ", selectedTab);
    if (selectedTab === "artists") {
      response = await apiFetch(`/posts/byFollowingArtists/${user.sub}`);
    } else if (selectedTab === "friends") {
      response = await apiFetch(`/posts/byFollowing/${user.sub}`);
    } else if (selectedTab === "user") {
      response = await apiFetch(`/posts/userPosts/${userId}`);
    } else {
      response = await apiFetch("/posts");
    }

    const data = await response.json();

    setPosts(data);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedTab, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  const start = Math.max(posts.length - visibleCount, 0);
  const visiblePosts = posts.slice(start);
  const reversedVisiblePosts = [...visiblePosts].reverse();

  if (posts.length === 0) {
    return <div className={styles["empty-posts-message"]}>
      <h3  className={styles["h3-empty"]}>There are no posts here yet <br/><br/></h3>
      <h2 className={styles["h2-empty"]}>Post your first post or follow other users to see interesting updates!</h2>
    </div>;
  }

  return (
    <>
      <div className={styles["posts-container"]}>
        {reversedVisiblePosts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
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
    </>
  );
}
