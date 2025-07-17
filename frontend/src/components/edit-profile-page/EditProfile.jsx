import React, { useState, useRef, useEffect } from "react";
import styles from "./EditProfile.module.css";
import LeftSide from "../main-components/LeftSide";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const statusRef = useRef(null);
  const menuRef = useRef(null);

  // Закрити меню при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !statusRef.current.contains(event.target)
      ) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container}>

      <div className={styles["empty-div1"]}></div>

      <div className={styles["profile-side"]}>
        <div className={styles["channel-hat"]}>
          <button
            className={styles["return-profile"]}
            onClick={() => navigate("/my-profile")}
          >
            Return to profile
          </button>

          <div className={styles["profile-photo"]} style={{ position: "relative" }}>
            <div
              className={styles.status}
              ref={statusRef}
              onClick={() => setMenuVisible((prev) => !prev)}
            ></div>

            {menuVisible && (
              <div className={styles["status-menu"]} ref={menuRef}>
                <div className={styles["menu-item1"]}>Change avatar</div>
                <div className={styles["menu-item"]}>Change banner</div>
              </div>
            )}
          </div>

          <div className={styles["you-name"]}>You</div>
        </div>

        <div className={styles["profile-bio"]}>
          Nisi ut aliquip ex ea commodo consequatt in
        </div>

        <div className={styles["wrap"]}>
          <button className={styles["edit-btnup"]}>Edit</button>
        </div>

        <div className={styles["edit-container"]}>
          <div className={styles["edit-main"]}>
            <div className={styles["your-name-text"]}>Your name</div>
            <div className={styles["two-in-one"]}>
              <input
                type="text"
                className={styles["edit-name"]}
                placeholder="Name"
              />
              <input
                type="text"
                className={styles["edit-last-name"]}
                placeholder="Last name"
              />
            </div>

            <div className={styles["two-in-one-text"]}>
              <div className={styles["standart-profile-text"]}>
                Profile View
              </div>
              <div className={styles["standart-profile-text"]}>
                Proffesional profile
              </div>
            </div>

            <div className={styles["two-in-one"]} style={{ position: "relative" }}>
              <input
                type="text"
                className={styles["edit-username"]}
                placeholder="Listener"
              />
              <div className={styles["prof-profile"]}>Artist</div>
            </div>

            <div className={styles["your-name-text"]}>Personal information</div>
            <div className={styles["two-in-one"]}>
              <input
                type="text"
                className={styles["edit-nickname"]}
                placeholder="Nickname"
              />
              <input
                type="text"
                className={styles["edit-email"]}
                placeholder="Email"
              />
            </div>
            <div className={styles["your-name-text"]}>Location</div>
            <input
              type="text"
              className={styles["edit-location"]}
              placeholder="Location"
            />

            <div className={styles["your-name-text"]}>Password</div>
            <div className={styles["two-in-one"]}>
              <input
                type="text"
                className={styles["edit-password"]}
                placeholder="Password"
              />
              <div className={styles["btn-edit-plat"]}>
                <div className={styles["btn-edit"]}>Edit</div>
              </div>
            </div>

            <div className={styles["your-name-text"]}>Socials</div>
            <div className={styles["two-in-one"]}>
              <input
                type="text"
                className={styles["edit-insta"]}
                placeholder="Instagram"
              />
              <input
                type="text"
                className={styles["edit-tg"]}
                placeholder="Telegram"
              />
            </div>

            <div className={styles["save-btn-plat"]}>
              <button className={styles["logout-btn"]}>Logout</button>

              <button className={styles["save-btn"]}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
