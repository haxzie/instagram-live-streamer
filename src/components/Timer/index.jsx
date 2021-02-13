import React, { useState } from "react";
import styles from "./styles.module.scss";

export default function Timer({ seconds, maxLimit }) {
  const format = (time) => {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };

  return (
    <div className={styles.timer}>
      <span>
        {format(seconds)}<span style={{ opacity: "0.5"}}>/{format(maxLimit)}</span>
      </span>
    </div>
  );
}
