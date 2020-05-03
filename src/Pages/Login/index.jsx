import React, { useState } from "react";
import styles from "./styles.module.scss";
import StreamonLogo from "../../images/streamon-logo.svg";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import LoadingBar from "../../components/LoadingBar";
import { IgApiClient } from "instagram-private-api";
import { loginToInstagram } from "../../lib/igClient";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setUserProfile, setSignedIn, setIgClient} from "../../store/User/actions";

function Login({ dispatch }) {
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credError, setCredError] = useState(false);
  const history = useHistory();
  const client = new IgApiClient();

  const signIn = async () => {
    setLoading(true);
    setCredError(false);
    const profile = await loginToInstagram({ client, username, password });
    if (!profile) {
      setLoading(false);
      return setCredError(true);
    }

    dispatch(setUserProfile(profile));
    dispatch(setSignedIn(true));
    dispatch(setIgClient(client));
    console.log({ history })
    setLoading(false);
    history.push('/home');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn();
  }

  return (
    <div className={styles.loginPage}>
      <img className={styles.instaLogo} src={StreamonLogo} alt="ig_logo"/>
      {isLoading ? (
        <div className={styles.loaderArea}>
          <LoadingBar />
        </div>
      ) : (
        <form className={styles.contents} onSubmit={handleSubmit}>
          <h4 className={styles.formTitle}>Login to instagram</h4>
          {credError ? (
            <span className={styles.error}>Invalid username or password</span>
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
          <Button onClick={signIn} type="submit">Login</Button>
          <div className={styles.statusTexts}>
            <p className={styles.status}>Instagram Live Streamer v0.1.1 Beta</p>
            <p className={styles.author}>Created by Haxzie</p>
          </div>
        </form>
      )}
    </div>
  );
}

export default connect()(Login);
