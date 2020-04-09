import React from "react";
import styles from "./styles.module.scss";

export default function Loadingbar() {
  return (
    <div className={`${styles.loading} ${styles.center}`}>
      <div className={styles.loadingBar}></div>
    </div>
  );
}
