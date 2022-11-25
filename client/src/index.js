import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {disableReactDevTools} from "@fvilers/disable-react-devtools";     // remove this line if running on local computer

disableReactDevTools();     // remove this line if running on local computer

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
