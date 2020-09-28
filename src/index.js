import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./store";
import * as Sentry from '@sentry/browser';
Sentry.init({dsn: process.env.REACT_APP_SENTRY_DSN});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

