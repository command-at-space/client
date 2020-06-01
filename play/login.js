/*  */
"use strict";

import { conf } from "../_config.js";
import doAuthRequest from "../_lib/auth.js";

export let profile = {};

function doAutoLogin() {
  //console.log('doAutoLogin');
  return new Promise(function doSaltAndHash(resolve) {
    let urlData = conf.apiUrlBase + "/online/join";
    doAuthRequest(urlData, "POST", undefined, true, function doneAutoLogin(info) {
      info = JSON.parse(info);
      //console.log(info);
      resolve(info);
    });
  });
}

export default async function doGameLogin() {
  const url = new URL(location.href);
  const nick = url.searchParams.get("anonymous");
  if (nick === null) {
    const logged = await doAutoLogin();
    //console.log(logged);
    if (logged.isLogged) {
      document.getElementById("player").innerText = logged.profile.nick;
      profile = logged.profile;
    } else {
      alert("FAIL");
    }
  } else {
    document.getElementById("player").innerText = nick;
    profile.nick = nick;
    history.replaceState({}, null, "/play.html"); // hide url parameters
  }
}

