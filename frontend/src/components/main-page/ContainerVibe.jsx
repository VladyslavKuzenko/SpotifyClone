import React from "react";
import styles from "./main.module.css";

const ContainerVibe = () => {
  return (
    <div className={styles["container-vibe"]}>
      <div className={styles["vibe-div"]}>#dreamy</div>
      <div className={styles["vibe-div"]}>#newrelease</div>
      <div className={styles["vibe-div"]}>#energetic</div>
      <div className={styles["vibe-div"]}>#hiphop</div>
      <div className={styles["vibe-div"]}>#rap</div>
      <div className={styles["vibe-div"]}>#classical</div>
    </div>
  );
};

export default ContainerVibe;
