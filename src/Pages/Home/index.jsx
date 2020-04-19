import React, { useState } from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { LiveEntity } from "instagram-private-api";
import LoadingBar from "../../components/LoadingBar";
import TextInput from "../../components/TextInput";
import Toggle from "../../components/Toggle"

function Home({ client, profile, isLoggedIn }) {
  const { username, full_name, profile_pic_url } = profile;

//   const username = "haxzie";
//   const full_name = "Musthaq Ahamad";
//   const profile_pic_url =
//     "https://instagram.fblr8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/91504837_161542001687235_603844261191876608_n.jpg?_nc_ht=instagram.fblr8-1.fna.fbcdn.net&_nc_ohc=rX-LGbJ8bzQAX_e2TCf&oh=0e386fabceef373074df1ca8df752460&oe=5EB9BBBC";

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
        setMuted(true);
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
    setLive(false);
    setReady(false);
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
        <button className={styles.liveButton} onClick={startLiveStream}>
          Start Live Stream
        </button>
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
        <div className={styles.linkFields}>
          <label>Stream URL</label>
          <TextInput value={streamURL} readOnly />
          <label>Stream Key</label>
          <TextInput value={streamKey} readOnly />
          <label>Comments</label>
          <Toggle onClick={unmuteStream} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    profile: state.user.profile,
    isLoggedIn: state.auth.isLoggedIn,
    client: state.instagram.client,
  };
};

export default connect(mapStateToProps)(Home);