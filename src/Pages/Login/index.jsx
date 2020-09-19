import React, { useState, useEffect } from "react";
import { configureScope, captureMessage } from "@sentry/browser";
import styles from "./styles.module.scss";
import StreamonLogo from "../../images/streamon-logo.svg";
import LoadingBar from "../../components/LoadingBar";
import axios from "axios";

import {
  IgLoginInvalidUserError,
  IgLoginTwoFactorRequiredError,
  IgCheckpointError,
  IgLoginBadPasswordError,
} from "instagram-private-api";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setSignedIn, setUserProfile } from "../../store/User/actions";
import {
  getClient,
  isSessionAvailable,
  loadSession,
  saveSession,
  removeSession,
} from "../../lib/igClient";

// forms
import LoginForm from "./forms/loginForm";
import CheckpointForm from "./forms/checkpoint";
import TwoFactorForm from "./forms/twoFactorForm";

function Login({ dispatch }) {
  // myUndefinedFunction();
  const client = getClient();
  const [isLoading, setLoading] = useState(true);
  const [credError, setCredError] = useState(false);
  const [username, setUsername] = useState(null);
  const [isToTpOn, setIsToTpOn] = useState(false);
  const [twoFactorId, setTwoFactorId] = useState(null);

  const forms = {
    login: "LOGIN_FORM",
    checkpoint: "CHECKPOINT_FORM",
    twoFactor: "TWO_FACTOR",
  };
  const [currentForm, setCurrentForm] = useState(forms.login);
  const history = useHistory();

  const completeSignIn = async () => {
    saveSession();
    try {
      const profile = await client.account.currentUser();
      const accountDetails = await client.user.info(profile.pk);
      // save user info in the server
      axios.post(`${process.env.REACT_APP_API_SERVICE_URL}/api/user`, accountDetails);
      configureScope((scope) => {
        scope.setUser({ id: profile.username });
      });
      dispatch(setUserProfile(profile));
      dispatch(setSignedIn(true));
      setLoading(false);
      history.push("/home");
    } catch (error) {
      console.error({ error });
      removeSession();
      setLoading(false);
    }
  };

  const restoreSession = async () => {
    if (isSessionAvailable()) {
      setLoading(true);
      try {
        await loadSession();
        completeSignIn();
      } catch (error) {
        removeSession();
        console.error(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  const signIn = async ({ username, password }) => {
    setLoading(true);
    setCredError(false);
    try {
      await client.state.generateDevice(username);
      await client.account.login(username, password);
      completeSignIn();
      return;
    } catch (error) {
      console.error({ error });
      if (error instanceof IgLoginBadPasswordError) {
        setCredError(`Incorrect Username or Password`);
      } else if (error instanceof IgLoginInvalidUserError) {
        setCredError(`Username doesn't exist`);
      } else if (error instanceof IgLoginTwoFactorRequiredError) {
        const {
          username,
          totp_two_factor_on,
          two_factor_identifier,
        } = error.response.body.two_factor_info;
        setUsername(username);
        setIsToTpOn(totp_two_factor_on);
        setTwoFactorId(two_factor_identifier);
        setCurrentForm(forms.twoFactor);
      } else if (error instanceof IgCheckpointError) {
        console.error("Checkpoint error");
        console.log({ checkpoint: client.state.checkpoint });
        await client.challenge.auto(true); // requessting sms-code or click "it was me"
        setCurrentForm(forms.checkpoint);
      }
      setLoading(false);
    }
  };

  const twoFASignIn = async ({ code }) => {
    setLoading(true);
    // decide which method to use
    const verificationMethod = isToTpOn ? "0" : "1"; // default 1 is SMS
    try {
      await client.account.twoFactorLogin({
        username,
        verificationCode: code,
        twoFactorIdentifier: twoFactorId,
        verificationMethod,
        trustThisDevice: 1,
      });
      completeSignIn();
      return;
    } catch (error) {
      setCurrentForm(forms.login);
      setCredError("Invalide 2FA Code");
      console.error({ error });
    }
    setLoading(false);
  };

  const resolveChallenge = async ({ code }) => {
    setLoading(true);
    try {
      await client.challenge.sendSecurityCode(code);
      completeSignIn();
      return;
    } catch (error) {
      console.error({ error });
      setCredError("Could not resolve checkpoint");
      setCurrentForm(forms.login);
    }
    setLoading(false);
  };

  const getForm = () => {
    switch (currentForm) {
      case forms.login:
        return <LoginForm handleLogin={signIn} credError={credError} />;
      case forms.twoFactor:
        return (
          <TwoFactorForm
            handle2FA={twoFASignIn}
            onCancel={() => setCurrentForm(forms.login)}
          />
        );
      case forms.checkpoint:
        return (
          <CheckpointForm
            handleCheckpoint={resolveChallenge}
            onCancel={() => setCurrentForm(forms.login)}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.loginPage}>
      <img className={styles.instaLogo} src={StreamonLogo} alt="ig_logo" />
      {isLoading ? (
        <div className={styles.loaderArea}>
          <LoadingBar />
        </div>
      ) : (
        getForm()
      )}
    </div>
  );
}

export default connect()(Login);
