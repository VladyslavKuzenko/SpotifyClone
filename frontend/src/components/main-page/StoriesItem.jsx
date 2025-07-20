import { useRef, useEffect, useState } from "react";
import styles from "./main.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../../hooks/useApi";
import NewPost from "./NewPost";

const StoriesItem = () => {
  const scrollRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStoryGroup, setCurrentStoryGroup] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const {  apiFetch,user } = useAPI();
  const { isLoading } = useAuth0();

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

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStoryGroup([]);
    setCurrentStoryIndex(0);
    setCurrentUserIndex(0);
  };

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

  const getRandomGradient = () => {
    const angle = Math.floor(Math.random() * 360);
    const lightOrange = "#FFA500";
    const deepOrange = "#FF4500";
    return `linear-gradient(${angle}deg, ${lightOrange}, ${deepOrange})`;
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

  const groupedStories = stories.reduce((acc, story) => {
    const userId = story.user?.id;
    if (!userId) return acc;
    if (!acc[userId]) acc[userId] = [];
    acc[userId].push(story);
    return acc;
  }, {});

  const uniqueUsers = Object.values(groupedStories).map(
    (storyGroup) => storyGroup[0]
  );

  const goToNextStory = () => {
    if (currentStoryIndex < currentStoryGroup.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      goToNextUser();
    }
  };

  const goToPrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      goToPrevUser(true);
    }
  };

  const goToNextUser = () => {
    if (currentUserIndex < uniqueUsers.length - 1) {
      const newUserIndex = currentUserIndex + 1;
      setCurrentUserIndex(newUserIndex);
      setCurrentStoryGroup(groupedStories[uniqueUsers[newUserIndex].user.id]);
      setCurrentStoryIndex(0);
    }
  };

  const goToPrevUser = (openLastStory = false) => {
    if (currentUserIndex > 0) {
      const newUserIndex = currentUserIndex - 1;
      setCurrentUserIndex(newUserIndex);
      const prevGroup = groupedStories[uniqueUsers[newUserIndex].user.id];
      setCurrentStoryGroup(prevGroup);
      setCurrentStoryIndex(openLastStory ? prevGroup.length - 1 : 0);
    }
  };

  // Функція для рендеру полосок-індикаторів
  const renderStoryIndicators = (count, activeIndex) => {
    if (count === 0) return null;

    // Відстань між полосками у % (можна регулювати)
    const gapPercent = 4;

    // Ширина кожної полоски (щоб сумарна + відступи були близько 90%)
    let widthPercent = 0;

    if (count === 1) {
      widthPercent = 90;
    } else {
      widthPercent = (90 - gapPercent * (count - 1)) / count;
    }

    // Контейнер полосок — центрований
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: `${gapPercent}%`,
          width: "100%",
          padding: "0 5%",
          boxSizing: "border-box",
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            style={{
              width: `${widthPercent}%`,
              height: "4px",
              borderRadius: "2px",
              backgroundColor: i === activeIndex ? "#FF3740" : "#ffffffff",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {canScroll.left && (
        <div className={styles.leftplat}>
          <button onClick={() => handleScroll("left")}></button>
        </div>
      )}

      <div className={styles["container-stories"]} ref={scrollRef}>
        <div className={styles["storiesbtn-place"]}>
          <button
            onClick={() => setIsPostModalOpen(true)}
            className={styles["stories-btn"]}
            style={{ background: getRandomGradient() }}
          >
            <div className={styles["storiesbtn-plus"]}></div>
          </button>
        </div>

        {uniqueUsers.map((story, index) => (
          <div
            key={story.id || story.mediaUrl}
            className={styles["stories-plat"]}
            onClick={() => {
              openModal();
              setCurrentUserIndex(index);
              setCurrentStoryGroup(groupedStories[story.user.id]);
              setCurrentStoryIndex(0);
            }}
          >
            <div
              className={styles.stories}
              style={{ background: getRandomGradient() }}
            >
              <div className={styles["stories-inner"]}>
                <img
                  className={styles["preview-image"]}
                  src={story.mediaUrl}
                  alt="Story"
                />
              </div>
            </div>
            <div className={styles.nickname}>{story.user?.username}</div>
          </div>
        ))}
      </div>

      {canScroll.right && (
        <div className={styles.rightplat}>
          <button onClick={() => handleScroll("right")}></button>
        </div>
      )}

      {isModalOpen && currentStoryGroup.length > 0 && (
        <div
          className={styles["sts-modal-overlay"]}
          onClick={handleOverlayClick}
        >
          <div className={styles["sts-modal-window"]}>
            <div className={styles["storie-upper"]}>
              {renderStoryIndicators(
                currentStoryGroup.length,
                currentStoryIndex
              )}
            </div>

            {(currentStoryIndex > 0 || currentUserIndex > 0) && (
              <button
                className={styles["psb-modal-prev-button"]}
                onClick={goToPrevStory}
              ></button>
            )}

            <div className={styles["sts-modal-content"]}>
              <img
                className={styles["preview-image"]}
                src={currentStoryGroup[currentStoryIndex].mediaUrl}
                alt="Story"
              />
            </div>

            {(currentStoryIndex < currentStoryGroup.length - 1 ||
              currentUserIndex < uniqueUsers.length - 1) && (
              <button
                className={styles["psb-modal-next-button"]}
                onClick={goToNextStory}
              ></button>
            )}

            <div className={styles["storie-bottom"]}>
              <div className={styles["avatar-author"]}>
                <div className={styles["storie-avatar"]}></div>

                <div className={styles["author-data"]}>
                  <div className={styles["storie-author"]}>
                    {currentStoryGroup[currentStoryIndex].user.username}
                  </div>
                  <div className={styles["storie-data"]}>5 minute ago</div>
                </div>

                <div className={styles["storie-like"]}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPostModalOpen && (
        <NewPost
          onClose={() => setIsPostModalOpen(false)}
          initialTab="stories"
        />
      )}
    </div>
  );
};

export default StoriesItem;
