import React, { useRef, useState, useEffect } from "react";
import styles from "./main.module.css";

const SearchModal = ({ isSearchModalOpen, setIsSearchModalOpen }) => {
  const peopleRef = useRef(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(false);

  useEffect(() => {
    const container = peopleRef.current;
    if (!container) return;

    const checkButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftBtn(scrollLeft > 0);
      setShowRightBtn(scrollLeft + clientWidth < scrollWidth - 1);
    };

    checkButtons();

    container.addEventListener("scroll", checkButtons);
    const timeoutId = setTimeout(checkButtons, 100); // затримка після відкриття

    return () => {
      container.removeEventListener("scroll", checkButtons);
      clearTimeout(timeoutId);
    };
  }, [isSearchModalOpen]);

  const scroll = (direction) => {
    const container = peopleRef.current;
    if (!container) return;

    const scrollAmount = 400;
    container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  if (!isSearchModalOpen) return null;

  return (
    <>
      <div
        className={styles["search-dropdown-overlay"]}
        onClick={() => setIsSearchModalOpen(false)}
      ></div>

      <div
        className={styles["search-dropdown"]}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles["back-btn"]}
          onClick={() => setIsSearchModalOpen(false)}
        ></button>

        <div className={styles["modal-container"]}>
          <div className={styles["modal-content"]}>
            <div className={styles["mpp-container"]}>
              <div className={styles["music"]}>Music</div>
              <div className={styles["people"]}>People</div>
              <div className={styles["position"]}>Position</div>
            </div>

            <div className={styles["search-array"]}>
              {[...Array(20)].map((_, i) => (
                <div key={i} className={styles["song-item"]}>
                  <div className={styles["song-image"]}></div>
                  <div className={styles["tittle-artist"]}>
                    <div className={styles["song-tittle"]}>Song tittle</div>
                    <div className={styles["song-artist"]}>Artist</div>
                  </div>
                  <div className={styles["song-duration"]}>13:21</div>
                  <button className={styles["song-playbtn"]}>▶</button>
                  <button className={styles["song-menu"]}>
                    <div className={styles["menu-circle"]}></div>
                    <div className={styles["menu-circle"]}></div>
                    <div className={styles["menu-circle"]}></div>
                  </button>
                </div>
              ))}
            </div>

            <div className={styles["empty1"]}></div>

            <div className={styles["people-slider"]}>
              {showLeftBtn && (
                <button className={styles["scroll-btn-left"]} onClick={() => scroll("left")}>
                  ◀
                </button>
              )}

              <div className={styles["people-array"]} ref={peopleRef}>
                {[...Array(15)].map((_, i) => (
                  <div key={i} className={styles["people-icon"]}>
                    <div className={styles["people-photo"]}></div>
                    <div className={styles["name-surname"]}>Name Surname {i + 1}</div>
                    <div className={styles["people-nickname"]}>@nickname{i + 1}</div>
                  </div>
                ))}
              </div>

              {showRightBtn && (
                <button className={styles["scroll-btn-right"]} onClick={() => scroll("right")}>
                  ▶
                </button>
              )}
            </div>

            <div className={styles["grid-container"]}>
              {[...Array(20)].map((_, i) => (
                <button key={i} className={styles["grid-item"]}>
                  Warsaw
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
