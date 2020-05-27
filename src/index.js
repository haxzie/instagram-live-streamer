import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./store";
import * as Sentry from '@sentry/browser';
Sentry.init({dsn: "https://f02edc62479c4cc1bb6294479f0cddb2@o399065.ingest.sentry.io/5255615"});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
