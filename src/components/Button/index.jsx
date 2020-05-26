import React from "react";
import styles from "./styles.module.scss";

export default function Button(props) {
  const getButtonClass = (buttontype) => {
    if (!buttontype) {
      return "";
    } else {
      switch (buttontype) {
        case "clear":
          return styles.clear;
        case "rounded":
          return styles.rounded;
      }
    }
  };
  return (
    <button
      className={`${styles.fancyButton} ${getButtonClass(props.buttontype)}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
