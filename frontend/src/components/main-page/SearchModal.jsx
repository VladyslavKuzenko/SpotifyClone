import React, { useRef, useState, useEffect } from "react";
import styles from "./main.module.css";
import { useAPI } from "../../hooks/useApi";
import { searchSongs, searchUsers } from "../../js/functions/functions";
import SongItem from "../player-page/SongItem";
import { useAudio } from "../../hooks/useAudio";

const SearchModal = ({
  isSearchModalOpen,
  setIsSearchModalOpen,
  searchParams,
}) => {
  const peopleRef = useRef(null);
  const { apiFetch } = useAPI();
  const [usersOriginalList, setUsersOriginalList] = useState([]);
  const [usersFilteredList, setUsersFilteredList] = useState([]);
  const [songsOriginalList, setSongsOriginalList] = useState([]);
  const [songsFilteredList, setSongsFilteredList] = useState([]);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(false);
  const { setCurrentSongList, setIsRandomList } = useAudio();

  const fetchUsers = async () => {
    const response = await apiFetch("/users");
    const data = await response.json();
    setUsersOriginalList(data);
    setUsersFilteredList(data);
  };
  const fetchTracks = async () => {
    const response = await apiFetch("/tracks");
    const data = await response.json();
    setSongsOriginalList(data);
    setSongsFilteredList(data);
    console.log("Track", data);
  };
  useEffect(() => {
    fetchUsers();
    fetchTracks();
  }, []);

  useEffect(() => {
    if (usersOriginalList.length > 0)
      searchUsers(usersOriginalList, searchParams, setUsersFilteredList);
    if (songsOriginalList.length > 0)
      searchSongs(songsOriginalList, searchParams, setSongsFilteredList);
  }, [searchParams, usersOriginalList, songsOriginalList]);

  // Блокування скролу при відкритті модалки
  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchModalOpen]);

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
    const timeoutId = setTimeout(checkButtons, 100);

    return () => {
      container.removeEventListener("scroll", checkButtons);
      clearTimeout(timeoutId);
    };
  }, [isSearchModalOpen]);

  const scroll = (direction) => {
    const container = peopleRef.current;
    if (!container) return;

    const scrollAmount = 400;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
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

        <div className={styles["xxxtext"]}>Search</div>

        <div className={styles["modal-container"]}>
          <div className={styles["modal-content"]}>
            <div className={styles["mpp-container"]}>
              <div className={styles["people"]}>People</div>
            </div>

            <div className={styles["people-slider"]}>
              {showLeftBtn && (
                <button
                  className={styles["scroll-btn-left"]}
                  onClick={() => scroll("left")}
                >
                  ◀
                </button>
              )}

              <div className={styles["people-array"]} ref={peopleRef}>
                {usersFilteredList.map((item, index) => (
                  <div key={index} className={styles["people-icon"]}>
                    <div className={styles["people-photo"]}>
                      <img
                        src={item.avatarImgUrl}
                        className={styles["preview-image"]}
                        alt=""
                      />
                    </div>
                    <div className={styles["name-surname"]}>
                      {item.firstName} {item.lastName}
                    </div>
                    <div className={styles["people-nickname"]}>
                      {item.username}
                    </div>
                  </div>
                ))}
              </div>

              {showRightBtn && (
                <button
                  className={styles["scroll-btn-right"]}
                  onClick={() => scroll("right")}
                >
                  ▶
                </button>
              )}
            </div>

            <div className={styles["music"]}>Music</div>

            <div className={styles["search-array"]}>
              {songsFilteredList.map((item, index) => (
                <>
                  <SongItem
                    key={index}
                    song={item}
                    onSetCurrentSongList={() => {
                      setIsRandomList(false);
                      setCurrentSongList(songsFilteredList);
                    }}
                    moreInfo
                  />
                  
                </>
              ))}
            </div>

            <div className={styles["empty1"]}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
