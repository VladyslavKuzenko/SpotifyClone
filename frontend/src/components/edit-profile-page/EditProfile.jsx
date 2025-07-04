import React from "react";
import styles from "./EditProfile.module.css";
import LeftSide from "../main-components/LeftSide";

export default function EditProfile() {
  return (
    <div className={styles.container}>
      <LeftSide />

      <div className={styles["empty-div1"]}></div>

      <div className={styles["profile-side"]}>
        <div className={styles["channel-hat"]}>
          <button className={styles["return-profile"]}>Return to profile</button>
          <div className={styles["profile-photo"]}>
            <div className={styles.status}></div>
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
                Standart profile
              </div>
              <div className={styles["standart-profile-text"]}>
                Proffesional profile
              </div>
            </div>

            <div className={styles["two-in-one"]} style={{ position: "relative" }}>
              <input
                type="text"
                className={styles["edit-username"]}
                placeholder="Username"
              />
              <div className={styles["prof-profile"]}>Artist</div>
              {/* Випадаюче меню видалене повністю */}
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
                placeholder="https://www.instagram.com/docm"
              />
              <input
                type="text"
                className={styles["edit-tg"]}
                placeholder="telegram"
              />
            </div>

            <div className={styles["save-btn-plat"]}>
              <div className={styles["save-btn"]}>Continue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
