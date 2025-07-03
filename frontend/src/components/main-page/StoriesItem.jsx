import React, { useRef, useEffect, useState } from "react";
import styles from "./main.module.css";

const StoriesItem = () => {
  const scrollRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      if (el) el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {canScroll.left && (
        <div className={styles.leftplat}>
          <button onClick={() => handleScroll("left")}>‹</button>
        </div>
      )}

      <div className={styles["container-stories"]} ref={scrollRef}>
        {[...Array(41)].map((_, i) => (
          <div key={i} className={styles["stories-plat"]} onClick={openModal}>
            <div className={styles.stories}></div>
            <div className={styles.nickname}>Name</div>
          </div>
        ))}
      </div>

      {canScroll.right && (
        <div className={styles.rightplat}>
          <button onClick={() => handleScroll("right")}>›</button>
        </div>
      )}

      {isModalOpen && (
        <div className={styles["sts-modal-overlay"]} onClick={handleOverlayClick}>
          <div className={styles["sts-modal-window"]}>
            <button className={styles["sts-modal-close"]} onClick={closeModal}>
              ×
            </button>
            <div className={styles["sts-modal-content"]}>
              <p>Stories content goes here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesItem;
