/* */
"use strict";

import { conf } from "./_config.js";
import * as auth from "./_lib/auth.js";
import * as router from "./router.js";

async function init() {
  console.log('Init Alpha', conf);
  router.prepareFormsEvents();
  const logged = await auth.doResign();
  if (logged.isLogged) {
    router.showLogged(logged);
  } else {
    router.showSignIn();
  }
}

window.addEventListener('load', init);

