/* */
"use strict";

import { conf } from "../_config.js";
import * as auth from "./auth.js";
import * as router from "./router.js";

async function init() {
  router.prepareFormsEvents();
  autoLogin();
}

async function autoLogin() {
  const logged = await auth.doAutoLogin();
  //console.log(logged);
  if (logged.isLogged) {
    router.showLogged(logged);
  } else {
    router.showSignIn();
  }
}

window.addEventListener('load', init);

