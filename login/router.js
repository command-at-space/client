/* */
"use strict";

import * as auth from "./auth.js";
import { conf } from "../_config.js";
import doAuthRequest from "../_lib/auth.js";

function showLogged(logged) {
  //console.log(logged);
  //console.log('Show Logged');
  document.getElementById("logged").style.display = "block";
  document.getElementsByClassName("login-page")[0].style.display = "none";

  //console.log(getCookie("alpha"));
  const cookieName = "alphaCAS";
  document.getElementById("player").innerHTML = logged.profile.nick;
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
  document.getElementsByClassName("anonymousForm")[0].style.display = "none";
}

function showSignIn() {
  //console.log('Sign In');
  document.getElementById("logged").style.display = "none";
  document.getElementsByClassName("login-page")[0].style.display = "block";
  document.getElementsByClassName("registerForm")[0].style.display = "none";
  document.getElementsByClassName("loginForm")[0].style.display = "block";
  document.getElementsByClassName("anonymousForm")[0].style.display = "none";
}

function showPlayAnonymous() {
  console.log('Play Anonymous');
  document.getElementById("logged").style.display = "none";
  document.getElementsByClassName("login-page")[0].style.display = "block";
  document.getElementsByClassName("registerForm")[0].style.display = "none";
  document.getElementsByClassName("loginForm")[0].style.display = "none";
  document.getElementsByClassName("anonymousForm")[0].style.display = "block";
}

function prepareFormsEvents() {
  const showSign = document.getElementsByClassName("fakeLink")[0];
  const showSign2 = document.getElementsByClassName("fakeLink")[5];
  const showCreate = document.getElementsByClassName("fakeLink")[2];
  const showCreate2 = document.getElementsByClassName("fakeLink")[4];
  const showAnonymous = document.getElementsByClassName("fakeLink")[1];
  const showAnonymous2 = document.getElementsByClassName("fakeLink")[3];
  showCreate.addEventListener("click", showCreateAccount);
  showSign.addEventListener('click', showSignIn);
  showAnonymous.addEventListener("click", showPlayAnonymous);
  showCreate2.addEventListener("click", showCreateAccount);
  showSign2.addEventListener('click', showSignIn);
  showAnonymous2.addEventListener("click", showPlayAnonymous);
  const create = document.getElementById("create");
  const login = document.getElementById("login");
  const anonymous = document.getElementById("anonymous");
  create.addEventListener("click", auth.doCreate);
  login.addEventListener("click", function login(e) {
    const user = document.getElementById("user2").value;
    const pass = document.getElementById("pass2").value;
    //console.log('doLOgin', user, pass, e);
    auth.doLogin(user, pass, e);
  });
  anonymous.addEventListener("click", function anonymous(e) {
    const user = document.getElementById("user3").value;
    auth.doAnonymous(user, e);
  });
}

function getSecret(e) {
  e.preventDefault();
  let url = conf.apiUrlBase + "/secret";
  doAuthRequest(url, "GET", null, true, function (data) {
    document.getElementById("secret").innerHTML = data;
  });
}

export {
  showLogged,
  showCreateAccount,
  showSignIn,
  prepareFormsEvents
};

