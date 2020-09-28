import { useState } from "react";
import axios from "axios";
import semver from "semver";
const appVersion = window.require("electron").remote.app.getVersion();

function useUpdate() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isAlive, setIsAlive] = useState(true);

  const checkForUpdates = async () => {
    try {
      const { status, data } = await axios.get(
        `${process.env.REACT_APP_API_SERVICE_URL}/api/status`
      );
      if (status === 200 && data) {
        const { alive, beta, stable } = data;
        if (alive) {
          // check if the app is in beta
          if (appVersion.endsWith("beta")) {
            const { version, releaseDate } = beta;
            const newVersionReleasedOn = new Date(releaseDate);
            console.log(`Streamon ${appVersion}`);
            console.log(
              `Streamon latest version ${version} -> ${newVersionReleasedOn}`
            );
            if (semver.gte(appVersion, version)) {
              console.log("App is upto date");
            } else {
              setIsUpdateAvailable(true);
            }
          } else {
            const { version, releaseDate } = stable;
            const newVersionReleasedOn = new Date(releaseDate);
            console.log(`Streamon ${appVersion}`);
            console.log(
              `Streamon latest version ${version} -> ${newVersionReleasedOn}`
            );
            if (semver.gte(appVersion, version)) {
              console.log("App is upto date");
            } else {
              setIsUpdateAvailable(true);
            }
          }
        } else {
          setIsAlive(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [isUpdateAvailable, checkForUpdates, isAlive];
}

export { useUpdate };
