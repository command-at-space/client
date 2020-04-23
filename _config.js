/* */
"use strict";

import { gameUrl } from "./_private.js";

const conf = {
  mode: "dev",
  //urlBase: getUrlBase()
};

conf.urlBase = getUrlBase();

function getUrlBase() {
  if (conf.mode === "dev") {
    return "http://localhost:7000";
  } else {
    return gameUrl;
  }
}

export {
  conf
};

