import React, { useState } from "react";
import styles from "../styles.module.scss";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";

export default function LoginForm({ handleLogin, credError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
  };

  return (
    <form className={styles.contents} onSubmit={handleSubmit}>
      <h4 className={styles.formTitle}>Login to instagram</h4>
      {credError ? (
        <span className={styles.error}>{credError === true? 'Invalid username or password': credError}</span>
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
      <Button onClick={() => handleLogin({ username, password })} type="submit">
        Login
      </Button>
      <div className={styles.statusTexts}>
        <p className={styles.status}>Instagram Live Streamer v0.1.1 Beta</p>
        <p className={styles.author}>Created by Haxzie</p>
      </div>
    </form>
  );
}
