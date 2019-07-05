/* */
"use strict";

import { gameUrl } from "./_private.js";

const conf = {
  mode: "dev2",
  //urlBase: getUrlBase()
};

conf.urlBase = getUrlBase();

function getUrlBase() {
  if (conf.mode === "dev") {
    return "http://localhost:3000";
  } else {
    return gameUrl;
  }
}

export {
  conf
};

