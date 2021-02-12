import Analytics from "electron-google-analytics";
import { v4 as uuid } from "uuid";
import Store from "electron-store";
const store = new Store();
const GA_ID = "UA-101997744-9";
const analytics = new Analytics(GA_ID);

export const eventCategory = {
  USER_INTERACTION: "User Interaction",
  APP_USAGE: "App usage",
  LIVE_STREAM: "Live Stream",
};

export function init() {
  // Retrieve the userid value, and if it's not there, assign it a new uuid.
  const userId = store.get("userid") || uuid();

  // (re)save the userid, so it persists for the next app session.
  store.set("userid", userId);
  analytics.set("uid", userId);
}

export function trackEvent({ category, action, label, value }) {
  const userId = store.get("userid") || uuid();
  analytics.set("uid", userId);

  analytics
    .event(category, action, {
      evLabel: label,
      evValue: value,
    })
    .then((response) => {
      console.log({ response });
      return response;
    })
    .catch((err) => {
      console.err({ err });
      return err;
    });
}
