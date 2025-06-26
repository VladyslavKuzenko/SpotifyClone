import React from "react";
import styles from "./main.module.css";

const StoriesItem = () => {
  return (
    <div className={styles["container-stories"]}>
      {[...Array(11)].map((_, i) => (
        <div key={i} className={styles["stories-plat"]}>
          <div className={styles.stories}></div>
          <div className={styles.nickname}>Name</div>
        </div>
      ))}
    </div>
  );
};

export default StoriesItem;
