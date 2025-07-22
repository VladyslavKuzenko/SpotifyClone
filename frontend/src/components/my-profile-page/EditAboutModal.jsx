import React, { useRef, useState } from "react";
import styles from "./MyProfile.module.css";
import mainPageStyles from "../main-page/main.module.css";
import { handleUploadFile } from "../../js/functions/functions";
import { useAPI } from "../../hooks/useApi";

const EditAboutModal = ({ artist, onClose }) => {
  const [aboutImage, setAboutImage] = useState(
    artist.aboutImgUrl ? artist.aboutImgUrl : ""
  );
  const [aboutArtist, setAboutArtist] = useState(
    artist.aboutArtist ? artist.aboutArtist : ""
  );
  const [facebookLink, setFacebookLink] = useState(
    artist.facebookLink ? artist.facebookLink : ""
  );
  const [instagramLink, setInstagramLink] = useState(
    artist.instagramLink ? artist.instagramLink : ""
  );
  const [twitterLink, setTwitterLink] = useState(
    artist.twitterLink ? artist.twitterLink : ""
  );
  const { apiAxiosPost, apiFetch } = useAPI();
  const imageInputRef = useRef();
  const submitAbout = async () => {
    const aboutImgUrl = await handleUploadFile(
      artist,
      aboutImage,
      apiAxiosPost,
      "/artists/upload/"
    );
    artist.aboutImgUrl = aboutImgUrl;
artist.aboutArtist=aboutArtist;
artist.facebookLink=facebookLink;
artist.instagramLink=instagramLink;
artist.twitterLink=twitterLink;
    const responseUpdate = await apiFetch("/artists/updateAbout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artist),
    });
    if (responseUpdate.ok) {
      console.log("Update about artist successfully");
    } else {
      console.log("Bad update about artist");
    }
  };
  return (
    <div className={styles["eam-overlay"]}>
      <div className={styles["eam-modal"]}>
        <div className={styles["eam-left"]}>
          <div className={styles["eam-text"]}>Your information</div>
          <div className={styles["eam-photo"]}>
            {aboutImage && (
              <img
                className={mainPageStyles["preview-image"]}
                src={(aboutImage instanceof File)? URL.createObjectURL(aboutImage):aboutImage}
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
            value={aboutArtist}
            onChange={(e) => setAboutArtist(e.target.value)}
          />
          <input
            type="text"
            className={styles["eam-link-input"]}
            placeholder="Link"
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
          />
          <input
            type="text"
            className={styles["eam-link-input"]}
            placeholder="Link"
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
          />
          <input
            type="text"
            className={styles["eam-link-input"]}
            placeholder="Link"
            value={twitterLink}
            onChange={(e) => setTwitterLink(e.target.value)}
          />
          <div className={styles["eam-buttons"]}>
            <button onClick={onClose} className={styles["eam-cancel"]}>
              Cancel
            </button>
            <button className={styles["eam-save"]} onClick={submitAbout}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAboutModal;
