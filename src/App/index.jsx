import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Portal from "../Portal";
import { useUpdate } from "../lib/appStatusHook";
import UpdateModal from "../components/UpdateModal";

export default function App() {
  const [
    isUpdateAvailable,
    checkForUpdates,
    isAlive,
  ] = useUpdate();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    checkForUpdates();
  }, []);

  useEffect(() => {
    if (isUpdateAvailable) {
      setShowUpdateModal(true);
    }
  }, [isUpdateAvailable]);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
        {showUpdateModal ? (
          <Portal>
            <UpdateModal
              title="Update available!"
              message="A new version of Streamon is available, please download the latest version."
              link="https://getstreamon.com/downloads"
              onClickClose={() => setShowUpdateModal(false)}
            />
          </Portal>
        ) : (
          <></>
        )}
      </Layout>
    </Router>
  );
}
