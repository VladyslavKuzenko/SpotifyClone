import React, { useRef, useEffect, useState } from "react";
import styles from "./main.module.css";

const StoriesItem = () => {
  const scrollRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

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

    // Миттєве оновлення після прокрутки
    requestAnimationFrame(() => {
    });
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
          <div key={i} className={styles["stories-plat"]}>
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
    </div>
  );
};

export default StoriesItem;
