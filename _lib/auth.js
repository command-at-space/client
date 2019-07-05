/* */
"use strict";

import doRequest from "./net.js";
import { conf } from "../_config.js";
import { showLogged, showSignIn } from "./../router.js";

function doResign() {
  //console.log('doResign');
  return new Promise(function doSaltAndHash(resolve, reject) {
    let urlData = conf.urlBase + "/resign";
    doRequest(urlData, "POST", undefined, true, function doneResign(info) {
      info = JSON.parse(info);
      resolve(info);
    });
  });
}

function doLogin(user, pass, e) {
  //console.log('doLogin');
  e.preventDefault();
  let urlData = conf.urlBase + "/login";

  let formBody = "";
  const k1 = encodeURIComponent("user");
  const k2 = encodeURIComponent("pass");
  const v1 = encodeURIComponent(user);
  const v2 = encodeURIComponent(pass);
  formBody = k1 + "=" + v1 + "&" + k2 + "=" + v2;
  doRequest(urlData, "POST", formBody, true, function logged(data) {
    data = JSON.parse(data);
    if (data.isLogged === true) {
      showLogged(data);
    }
  });
}

function doCreate(e) {
  e.preventDefault();
  let urlData = conf.urlBase + "/signup";

  const user = document.getElementById("user1").value;
  const pass = document.getElementById("pass1").value;
  const mail = document.getElementById("mail1").value;

  let formBody = "";
  const k1 = encodeURIComponent("user");
  const k2 = encodeURIComponent("pass");
  const k3 = encodeURIComponent("mail");
  const v1 = encodeURIComponent(user);
  const v2 = encodeURIComponent(pass);
  const v3 = encodeURIComponent(mail);
  formBody = k1 + "=" + v1 + "&" + k2 + "=" + v2 + "&" + k3 + "=" + v3;
  doRequest(urlData, "POST", formBody, true, function created(data) {
    doLogin(user, pass, e);
  });
}

function doLogout() {
  //console.log('LOGOUT');
  let url = conf.urlBase + "/logout";
  doRequest(url, "POST", null, true, function (data) {
    data = JSON.parse(data);
    showSignIn();
  });
}

function getCookie(name) {
  var value = "; " + decodeURIComponent(document.cookie);
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  }
  return value;
}

export {
  doResign,
  doLogin,
  doCreate,
  doLogout,
  getCookie
};
