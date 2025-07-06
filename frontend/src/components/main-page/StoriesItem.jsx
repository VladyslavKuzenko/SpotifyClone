import React, { useRef, useEffect, useState } from "react";
import styles from "./main.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../../hooks/useApi";

const StoriesItem = () => {
  const scrollRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [stories, setStories] = useState([]);
  const { apiFetch } = useAPI();
  const { user, isLoading } = useAuth0();

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setCanScroll({
      left: scrollLeft > 0,
      right: scrollLeft < maxScrollLeft - 1,
    });
  };

  const handleScroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.7455;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles["sts-modal-overlay"])) {
      closeModal();
    }
  };

  const fetchStories = async () => {
    const response = await apiFetch(`/story/followings/${user.sub}`);
    const data = await response.json();
    setStories(data);
  };

  useEffect(() => {
    if (!isLoading) {
      fetchStories();
    }
  }, [isLoading]);

  useEffect(() => {
    if (stories.length) {
      requestAnimationFrame(updateScrollState);
    }
  }, [stories]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      if (el) el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const getRandomGradient = () => {
    const angle = Math.floor(Math.random() * 360);
    const lightOrange = "#FFA500";
    const deepOrange = "#FF4500";
    return `linear-gradient(${angle}deg, ${lightOrange}, ${deepOrange})`;
  };

  return (
    <div className={styles.wrapper}>
      {canScroll.left && (
        <div className={styles.leftplat}>
          <button onClick={() => handleScroll("left")}></button>
        </div>
      )}

      <div className={styles["container-stories"]} ref={scrollRef}>
        {stories.map((i) => (
          <div
            key={i.id || i.mediaUrl}
            className={styles["stories-plat"]}
            onClick={() => {
              openModal();
              setCurrentStory(i);
            }}
          >
            <div
              className={styles.stories}
              style={{ background: getRandomGradient() }}
            >
              <div className={styles["stories-inner"]}></div>
              <img
                className={styles["preview-image"]}
                src={i.mediaUrl}
                alt="Story"
              />
            </div>
            <div className={styles.nickname}>{i.user?.username}</div>
          </div>
        ))}
      </div>

      {canScroll.right && (
        <div className={styles.rightplat}>
          <button onClick={() => handleScroll("right")}></button>
        </div>
      )}

      {isModalOpen && currentStory && (
        <div
          className={styles["sts-modal-overlay"]}
          onClick={handleOverlayClick}
        >
          <div className={styles["sts-modal-window"]}>
            <div className={styles["storie-upper"]}>
              <button
                className={styles["sts-modal-close"]}
                onClick={closeModal}
              ></button>
            </div>

            <div className={styles["sts-modal-content"]}>
              <img
                className={styles["preview-image"]}
                src={currentStory.mediaUrl}
                alt="Story"
              />
            </div>

            <div className={styles["storie-bottom"]}>
              <div className={styles["avatar-author"]}>
                <div className={styles["storie-avatar"]}></div>
                <div className={styles["storie-author"]}>{currentStory.user.username}</div>
                <div className={styles["storie-like"]}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesItem;
