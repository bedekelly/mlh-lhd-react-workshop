import React from "react";
import ReactDOM from "react-dom";
import Search from "./Search";
import {Router} from "@reach/router";
import About from "./About";

ReactDOM.render(
  <Router>
    <Search path={"/"} />
    <Search path={"/q/:query"}/>
    <About path={"/about"}/>
  </Router>

  , document.getElementById("root"));
