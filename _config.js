/* */
"use strict";

const conf = {
  mode: "dev2",
  anonymousPrefix: "tmp_",
  apiUrlBase: "",
  websocketUrl: "",
};

conf.apiUrlBase = getapiUrlBase();
conf.websocketUrl = getWebsocketUrl();

function getapiUrlBase() {
  if (conf.mode === "dev") {
    return "http://localhost:6900";
  } else {
    return "https://commandatspace.com/api/v0";
  }
}

function getWebsocketUrl() {
  if (conf.mode === "dev") {
    return "ws://localhost:6900/chat/msg";
  } else {
    return "wss://commandatspace.com/api/v0/chat/msg";
  }
}

export {
  conf
};

/*
use localhost
with 127.0.0.1 cant see cookies value
*/

