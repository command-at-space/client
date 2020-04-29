/*  */
"use strict";

import doGameLogin from "./login.js";

async function init() {
  await doGameLogin();
}

window.addEventListener('load', init);

