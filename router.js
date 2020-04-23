/* */
"use strict";

import * as auth from "./_lib/auth.js";
import { conf } from "./_config.js";
import doRequest from "./_lib/net.js";

function showLogged(logged) {
  console.log(logged);
  //console.log('Show Logged');
  document.getElementById("logged").style.display = "block";
  document.getElementsByClassName("login-page")[0].style.display = "none";

  //console.log(getCookie("alpha"));
  const cookieName = "alpha";
  document.getElementById("player").innerHTML = logged.profile.name;
  document.getElementById("cookie").innerHTML = auth.getCookie(cookieName);
  document.getElementById("logout").addEventListener("click", auth.doLogout);
  document.getElementById("getSecret").addEventListener("click", getSecret);
}

function showCreateAccount() {
  //console.log('Show Create Account');
  document.getElementById("logged").style.display = "none";
  document.getElementsByClassName("login-page")[0].style.display = "block";
  document.getElementsByClassName("registerForm")[0].style.display = "block";
  document.getElementsByClassName("loginForm")[0].style.display = "none";
}

function showSignIn() {
  //console.log('Sign In');
  document.getElementById("logged").style.display = "none";
  document.getElementsByClassName("login-page")[0].style.display = "block";
  document.getElementsByClassName("registerForm")[0].style.display = "none";
  document.getElementsByClassName("loginForm")[0].style.display = "block";
}

function prepareFormsEvents() {
  const showSign = document.getElementsByClassName("fakeLink")[0];
  const showCreate = document.getElementsByClassName("fakeLink")[1];
  showCreate.addEventListener("click", showCreateAccount);
  showSign.addEventListener('click', showSignIn);
  const create = document.getElementById("create");
  const login = document.getElementById("login");
  create.addEventListener("click", auth.doCreate);
  login.addEventListener("click", function login(e) {
    const user = document.getElementById("user2").value;
    const pass = document.getElementById("pass2").value;
    //console.log('doLOgin', user, pass, e);
    auth.doLogin(user, pass, e);
  });
}

function getSecret(e) {
  e.preventDefault();
  let url = conf.urlBase + "/secret";
  doRequest(url, "GET", null, true, function (data) {
    document.getElementById("secret").innerHTML = data;
  });
}

export {
  showLogged,
  showCreateAccount,
  showSignIn,
  prepareFormsEvents
};

