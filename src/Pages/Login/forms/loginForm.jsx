import React, { useState } from "react";
import styles from "../styles.module.scss";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import open from "open";

export default function LoginForm({ handleLogin, credError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
  };

  const openLinkInBrowser = (link) => {
    open(link);
  };

  return (
    <form className={styles.contents} onSubmit={handleSubmit}>
      <h4 className={styles.formTitle}>Login to Instagram</h4>
      {credError ? (
        <span className={styles.error}>
          {credError === true ? "Invalid username or password" : credError}
        </span>
      ) : (
        <></>
      )}
      <TextInput
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button
        onClick={() => {
          handleLogin({ username, password });
        }}
        type="submit"
      >
        Login
      </Button>
      <div className={styles.statusTexts}>
      <p className={styles.status}>Streamon v{process.env.REACT_APP_VERSION}</p>
        <p className={styles.author}>
          <span
            className={styles.link}
            onClick={() => openLinkInBrowser("https://getstreamon.com/terms")}
          >
            ToS and Privacy Policy
          </span>
        </p>
        <p className={styles.links}>
          <span
            className={styles.link}
            onClick={() =>
              openLinkInBrowser("https://getstreamon.com/downloads")
            }
          >
            Updates
          </span>{" "}
          •&nbsp;
          <span
            className={styles.link}
            onClick={() =>
              openLinkInBrowser(
                "https://github.com/haxzie/instagram-live-streamer"
              )
            }
          >
            GitHub
          </span>{" "}
          •&nbsp;
          <span
            className={styles.link}
            onClick={() => openLinkInBrowser("https://twitter.com/streamonhq")}
          >
            Community
          </span>
        </p>
      </div>
    </form>
  );
}
