import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {disableReactDevTools} from "@fvilers/disable-react-devtools";

if (process.end.REACT_APP_NODE_ENV === "production") disableReactDevTools();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
