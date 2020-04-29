/* */
"use strict";

const conf = {
  mode: "dev",
  anonymousPrefix: "tmp_"
  //apiUrlBase: getapiUrlBase()
};

conf.apiUrlBase = getapiUrlBase();

function getapiUrlBase() {
  if (conf.mode === "dev") {
    return "http://localhost:6900";
  } else {
    return "https://commandatspace.com/api/v0";
  }
}

export {
  conf
};

/*
use localhost
with 127.0.0.1 cant see cookies value
*/

