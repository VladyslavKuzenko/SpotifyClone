import React, { useState, useRef, useEffect } from "react";
import styles from "./profile.module.css";

export default function Profile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("Discover new music");
  const dropdownRef = useRef(null);

  // Закриття дропдауна при кліку поза ним
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  function selectOption(option) {
    setSelectedGoal(option);
    setDropdownOpen(false);
  }

  const goals = [
    "Discover new music",
    "Promote my songs",
    "Find collaborators",
    "Just for fun",
  ];

  return (
    <div className={styles["main-container"]}>
      <div className={styles.text1}>Profile Setup</div>
      <div className={styles.picture}></div>
      <div className={styles.container}>
        <button className={styles["change-picture"]}>Change picture</button>
        <button className={styles["delete-picture"]}>Delete picture</button>
      </div>
      <div className={styles.username}>Username</div>
      <input
        type="text"
        id="user-name"
        placeholder="@Name"
        className={styles["user-name"]}
      />

      <div className={styles["bottom-block"]}>
        <div className={styles.ocnt}>
          <div className={styles.b1}>
            <div className={styles.text11}>Location</div>
            <input
              type="text"
              id="location"
              placeholder="City or Country"
              className={styles.location}
            />
          </div>

          <div className={styles.b2}>
            <div className={styles.text11}>Your Goal</div>
            <div className={styles.dropdown} ref={dropdownRef}>
              <div className={styles["dropdown-toggle"]} onClick={toggleDropdown}>
                <span className={styles.label}>{selectedGoal}</span>
                <span className={styles.arrow}>{dropdownOpen ? "˄" : "˅"}</span>
              </div>
              {dropdownOpen && (
                <div className={styles["dropdown-options"]}>
                  {goals.map((goal) => (
                    <div key={goal} onClick={() => selectOption(goal)}>
                      {goal}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.text11}>Short Bio</div>
        <input
          type="text"
          id="bio"
          placeholder="Add a few words about your music taste..."
          className={styles.bio}
        />

        <div className={styles.text11}>Select your favorite genres:</div>

        <div className={styles["cont-block"]}>
          <div className={styles.up}>
            <div className={styles.block}>Hip Hop</div>
            <div className={styles.block}>Rap</div>
            <div className={styles.block}>Pop</div>
            <div className={styles.block}>Rock</div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.block}>Classical</div>
            <div className={styles.block}>Jazz</div>
            <div className={styles.block}>Metal</div>
            <div className={styles.block}>Other...</div>
          </div>
        </div>

        <div className={styles.text11}>Pick Your Vibe:</div>
        <div className={styles.bottom}>
          <div className={styles.block}>Dreamy</div>
          <div className={styles.block}>Bold</div>
          <div className={styles.block}>Chill</div>
          <div className={styles.block}>Moody</div>
        </div>

        <div className={styles.f}>
          <button className={styles["cnt-btn"]}>Continue</button>
        </div>
      </div>
    </div>
  );
}
