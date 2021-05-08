import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { LiveEntity, IgLoginRequiredError } from "instagram-private-api";
import LoadingBar from "../../components/LoadingBar";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import CommentIcon from "../../images/comment.svg";
import Comments from "../Comments";
import { getClient, removeSession } from "../../lib/igClient";
import { clearComments } from "../../store/User/actions";
import CopyIcon from "../../images/copy.svg";
import copy from "copy-to-clipboard";
import Timer from "../../components/Timer";
import useTimer from "../../lib/timerHook";
import config from "../../utils/config";
import open from "open";

const openLinkInBrowser = (link) => {
  open(link);
};

function Home({ profile, dispatch }) {
  const client = getClient();
  const history = useHistory();
  if (!(profile && profile.username)) history.push("/");
  const { username, full_name, profile_pic_url } = profile;
  const [isLive, setLive] = useState(false);
  const [isReady, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [broadcastId, setBroadcastId] = useState(null);
  const [streamTitle, setStreamTitle] = useState("");
  const [streamURL, setStreamURL] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [duration, startTimer, stopTimer, clearTimer] = useTimer(0);

  console.log({ profile })

  // stop the live stream if it crosses 1 hour
  // keeping buffer of 2 seconds to stop the stream
  useEffect(() => {
    if (duration >= config.STREAM_LIMIT - 2) {
      stopLiveStream();
    }
  }, [duration]);

  const iUrlRef = useRef();
  const iKeyRef = useRef();

  const startLiveStream = async () => {
    setIsLoading(true);
    try {
      const { broadcast_id, upload_url } = await client.live.create({
        // create a stream in 720x1280 (9:16)
        previewWidth: 720,
        previewHeight: 1280,
        message: streamTitle,
      });
      setBroadcastId(broadcast_id);
      const { stream_key, stream_url } = LiveEntity.getUrlAndKey({
        broadcast_id,
        upload_url,
      });
      setStreamURL(stream_url);
      setStreamKey(stream_key);
      setReady(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof IgLoginRequiredError) {
        removeSession();
        history.push("/");
        // client.account.logout();
      }
    }
  };

  const goLive = async () => {
    setIsLoading(true);
    if (broadcastId) {
      try {
        await client.live.start(broadcastId);
        await client.live.unmuteComment(broadcastId);
        dispatch(clearComments());
        clearTimer();
        startTimer();
        setLive(true);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setReady(false);
        setLive(false);
        if (error instanceof IgLoginRequiredError) {
          removeSession();
          history.push("/");
        }
      }
    }
  };

  const stopLiveStream = async () => {
    setIsLoading(true);
    try {
      await client.live.endBroadcast(broadcastId);
      if (config.SAVE_BROADCAST_TO_STORIES) {
        await client.live.addToPostLive(broadcastId);
      }
     
    } catch (error) {
      if (error instanceof IgLoginRequiredError) {
        removeSession();
        history.push("/");
      }
      setIsLoading(false);
      // return;
    }
    if (window.refreshInterval) {
      clearInterval(window.refreshInterval);
    }
    stopTimer();
    clearTimer();
    setStreamTitle("");
    setLive(false);
    setReady(false);
    setBroadcastId(null);
    setStreamKey(null);
    setStreamURL(null);
    setIsLoading(false);
  };

  const logout = async () => {
    removeSession();
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
          className={styles.animate}
        >
          <p className={styles.info}>
            Please make sure Live Archives are enabled in your account or you
            are recording the stream on your broadcasting software.{" "}
            <span
              style={{ color: "var(--color-primary)", cursor: "pointer" }}
              onClick={() =>
                openLinkInBrowser(
                  "https://getstreamon.com/blog/save-your-livestreams-to-igtv"
                )
              }
            >
              Read More
            </span>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              startLiveStream();
            }}
            style={{
              display: `flex`,
              flexDirection: `column`,
              justifyContent: `center`,
            }}
          >
            <TextInput
              style={{
                margin: `15px 0`,
                minWidth: `300px`,
              }}
              value={streamTitle}
              onChange={(e) => setStreamTitle(e.target.value)}
              placeholder="What are you streaming?"
              autoFocus={true}
            />
            <button className={styles.liveButton}>Start Live Stream</button>
          </form>
          <Button onClick={() => logout()} buttontype="clear">
            Logout
          </Button>
        </div>
      );
    }
  };

  const copyUrl = () => {
    copy(streamURL);
    iUrlRef.current.select();
  };

  const copyKey = () => {
    copy(streamKey);
    iKeyRef.current.select();
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.pageContents}>
        <div
          className={`${styles.profilePicWrapper} ${
            isLive ? styles.liveBorder : ""
          }`}
        >
          <img src={`${process.env.REACT_APP_IMAGE_PROXY}/${profile_pic_url}`} className={styles.profilePic} />
          {isLive ? <span className={`${styles.liveTag}`}> Live</span> : <></>}
        </div>
        <div className={styles.texts}>
          <h4 className={styles.fullName}>{full_name}</h4>
          <p className={styles.username}>@{username}</p>
        </div>
        {getButtonAndLoaders()}
        {isReady && !isLive ? (
          <>
            <div className={styles.linkFields}>
              <label>Stream URL</label>
              <div className={styles.row}>
                <TextInput value={streamURL} forwardRef={iUrlRef} readOnly />
                <button className={styles.copyIcon} onClick={copyUrl}>
                  <img src={CopyIcon} />
                </button>
              </div>
              <label>Stream Key</label>
              <div className={styles.row}>
                <TextInput
                  value={streamKey}
                  type="password"
                  forwardRef={iKeyRef}
                  readOnly
                />
                <button className={styles.copyIcon} onClick={copyKey}>
                  <img src={CopyIcon} />
                </button>
              </div>
              <Button onClick={() => setReady(false)} buttontype="ghost">
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
        {isReady && isLive ? <Timer seconds={duration} maxLimit={config.STREAM_LIMIT}/> : <></>}
      </div>
      {isLive ? (
        <div className={styles.popupContents}>
          <div
            className={`${styles.commentsFab}`}
            onClick={() => setShowComments(!showComments)}
          >
            <img src={CommentIcon} alt="" />
            Comments
          </div>

          <Comments
            open={showComments}
            broadcastId={broadcastId}
            clickClose={() => setShowComments(!showComments)}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    profile: state.user.profile,
  };
};

export default connect(mapStateToProps)(Home);
