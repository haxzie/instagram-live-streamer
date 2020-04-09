import React from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";

function Home({ profile, isLoggedIn }) {
    const {
      username = "haxzie",
      full_name = "Musthaq Ahamad",
      profile_pic_url = "https://instagram.fblr8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/91504837_161542001687235_603844261191876608_n.jpg?_nc_ht=instagram.fblr8-1.fna.fbcdn.net&_nc_ohc=rX-LGbJ8bzQAX_e2TCf&oh=0e386fabceef373074df1ca8df752460&oe=5EB9BBBC",
    } = profile;

//   const username = "haxzie";
//   const full_name = "Musthaq Ahamad";
//   const profile_pic_url =
//     "https://instagram.fblr8-1.fna.fbcdn.net/v/t51.2885-19/s150x150/91504837_161542001687235_603844261191876608_n.jpg?_nc_ht=instagram.fblr8-1.fna.fbcdn.net&_nc_ohc=rX-LGbJ8bzQAX_e2TCf&oh=0e386fabceef373074df1ca8df752460&oe=5EB9BBBC";

  return (
    <div className={styles.homePage}>
      <div className={styles.profilePicWrapper}>
        <img src={profile_pic_url} className={styles.profilePic} />
      </div>
      <div className={styles.texts}>
        <h4 className={styles.fullName}>{full_name}</h4>
        <p className={styles.username}>@{username}</p>
      </div>
      <button className={styles.liveButton}>Start Live Stream</button>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    profile: state.user.profile,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Home);
