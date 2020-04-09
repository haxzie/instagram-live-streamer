import React from "react";
import Layout from "../components/Layout";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </Layout>
    </Router>
  );
}
