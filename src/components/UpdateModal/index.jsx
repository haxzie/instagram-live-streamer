import React from "react";
import styles from "./styles.module.scss";
import open from "open";

export default function UpdateModal({
  title,
  message,
  cta,
  link,
  onClickClose,
}) {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.updateModal}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{message}</p>
        <div className={styles.buttonArea}>
            <button onClick={() => onClickClose()}>Remind me later</button>
            <button onClick={() => open(link)} className={styles.primary} autoFocus>Download Now</button>
        </div>
      </div>
    </div>
  );
}
