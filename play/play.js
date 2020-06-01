/*  */
"use strict";

import doGameLogin from "./login.js";
import startChat from "./chat/chat.js";

async function init() {
  //console.log('1');
  await doGameLogin();
  //console.log('2');
  await startChat();
  console.log('Ready');
}

window.addEventListener('load', init);
