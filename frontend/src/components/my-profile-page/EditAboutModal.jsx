import React, { useRef, useState } from "react";
import styles from "./MyProfile.module.css";
import mainPageStyles from "../main-page/main.module.css";

const EditAboutModal = ({ artist, onClose }) => {
  const [aboutImage, setAboutImage] = useState(artist.aboutImgUrl);
  const imageInputRef = useRef();
  return (
    <div className={styles["eam-overlay"]}>
      <div className={styles["eam-modal"]}>
        <div className={styles["eam-left"]}>
          <div className={styles["eam-text"]}>Your information</div>
          <div className={styles["eam-photo"]}>
            {aboutImage && (
              <img
                className={mainPageStyles["preview-image"]}
                src={URL.createObjectURL(aboutImage)}
                // alt="preview"
              />
            )}
          </div>

          <input
            style={{ display: "none" }}
            type="file"
            ref={imageInputRef}
            onChange={(e) => setAboutImage(e.target.files[0])}
            accept="image/*"
          />
          <button
            className={styles["eam-choosephoto"]}
            onClick={() => imageInputRef.current.click()}
          >
            Choose photo
          </button>
        </div>

        <div className={styles["eam-right"]}>
          <textarea
            className={styles["eam-textarea"]}
            placeholder="Write something about you..."
            value={artist.aboutArtist}
          />
          <input
            type="text"
            className={styles["eam-link-input"]}
            placeholder="Link"
            value={artist.facebookLink}
          />
          <input
            type="text"
            className={styles["eam-link-input"]}
            placeholder="Link"
            value={artist.instagramLink}
          />
          <input
            type="text"
            className={styles["eam-link-input"]}
            placeholder="Link"
            value={artist.twitterLink}
          />
          <div className={styles["eam-buttons"]}>
            <button onClick={onClose} className={styles["eam-cancel"]}>
              Cancel
            </button>
            <button className={styles["eam-save"]}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAboutModal;
