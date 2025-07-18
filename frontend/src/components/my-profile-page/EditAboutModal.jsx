import React from "react";
import styles from "./MyProfile.module.css";

const EditAboutModal = ({ onClose }) => {
    return (
        <div className={styles["eam-overlay"]}>
            <div className={styles["eam-modal"]}>

                <div className={styles["eam-left"]}>
                    <div className={styles["eam-text"]}>Your information</div>
                    <div className={styles["eam-photo"]}></div>
                    <button className={styles["eam-choosephoto"]}>Choose photo</button>
                </div>


                <div className={styles["eam-right"]}>
                    <textarea
                        className={styles["eam-textarea"]}
                        placeholder="Write something about you..."
                    />
                    <input type="text" className={styles["eam-link-input"]} placeholder="Link" />
                    <input type="text" className={styles["eam-link-input"]} placeholder="Link" />
                    <input type="text" className={styles["eam-link-input"]} placeholder="Link" />
                    <div className={styles["eam-buttons"]}>
                        <button onClick={onClose} className={styles["eam-cancel"]}>Cancel</button>
                        <button className={styles["eam-save"]}>Save</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EditAboutModal;
