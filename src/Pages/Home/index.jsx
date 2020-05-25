import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { LiveEntity } from "instagram-private-api";
import LoadingBar from "../../components/LoadingBar";
import TextInput from "../../components/TextInput";
import Toggle from "../../components/Toggle";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";

function Home({ client, isLoggedIn, profile }) {
  const history = useHistory();
  if (!(profile && profile.username)) history.push("/");
  const { username, full_name, profile_pic_url } = profile;
  const [isLive, setLive] = useState(false);
  const [isReady, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [broadcastId, setBroadcastId] = useState(null);
  const [streamURL, setStreamURL] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [isMuted, setMuted] = useState(false);

  const startLiveStream = async () => {
    setIsLoading(true);
    const { broadcast_id, upload_url } = await client.live.create({
      // create a stream in 720x1280 (9:16)
      previewWidth: 720,
      previewHeight: 1280,
      // this message is not necessary, because it doesn't show up in the notification
      message: "My message",
    });
    console.log({ broadcast_id, upload_url });
    setBroadcastId(broadcast_id);
    const { stream_key, stream_url } = LiveEntity.getUrlAndKey({
      broadcast_id,
      upload_url,
    });
    console.log({ stream_key, stream_url });
    setStreamURL(stream_url);
    setStreamKey(stream_key);
    setReady(true);
    setIsLoading(false);
  };

  const goLive = async () => {
    setIsLoading(true);
    if (broadcastId) {
      try {
        await client.live.start(broadcastId);
        await client.live.muteComment(broadcastId);
        setLive(true);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setReady(false);
        setLive(false);
      }
    }
  };

  const stopLiveStream = async () => {
    setIsLoading(true);
    await client.live.endBroadcast(broadcastId);
    await client.live.addToPostLive(broadcastId);
    setLive(false);
    setReady(false);
    setMuted(false);
    setBroadcastId(null);
    setStreamKey(null);
    setStreamURL(null);
    setIsLoading(false);
  };

  const unmuteStream = async () => {
    if (isMuted) {
      await client.live.unmuteComment(broadcastId);
      setMuted(false);
    } else {
      await client.live.muteComment(broadcastId);
      setMuted(true);
    }
  };

  const logout = async () => {
    console.log("Logging out");
    client.account.logout();
    history.push("/");
  };

  const getButtonAndLoaders = () => {
    if (isLoading) {
      return (
        <div>
          <LoadingBar />
        </div>
      );
    } else if (isReady && !isLive) {
      return (
        <button className={styles.goLiveButton} onClick={goLive}>
          Go Live!
        </button>
      );
    } else if (isLive) {
      return (
        <button className={styles.stopButton} onClick={stopLiveStream}>
          Stop Steam
        </button>
      );
    } else {
      return (
        <div
          style={{
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `center`,
          }}
        >
          <button className={styles.liveButton} onClick={startLiveStream}>
            Start Live Stream
          </button>
          <Button onClick={() => logout()} buttontype="clear">
            Logout
          </Button>
        </div>
      );
    }
  };

  return (
    <div className={styles.homePage}>
      <div
        className={`${styles.profilePicWrapper} ${
          isLive ? styles.liveBorder : ""
        }`}
      >
        <img src={profile_pic_url} className={styles.profilePic} />
        {isLive ? <span className={`${styles.liveTag}`}> Live</span> : <></>}
      </div>
      <div className={styles.texts}>
        <h4 className={styles.fullName}>{full_name}</h4>
        <p className={styles.username}>@{username}</p>
      </div>
      {getButtonAndLoaders()}
      {isReady ? (
        <>
        <div className={styles.linkFields}>
          <label>Stream URL</label>
          <TextInput value={streamURL} readOnly />
          <label>Stream Key</label>
          <TextInput value={streamKey} readOnly />
          <label>Mute Comments</label>
          <Toggle onClick={unmuteStream} />
        </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    client: state.instagram.client,
    profile: state.user.profile,
  };
};

export default connect(mapStateToProps)(Home);
