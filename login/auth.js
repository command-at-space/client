/* */
"use strict";

import doAuthRequest from "../_lib/auth.js";
import { conf } from "../_config.js";
import { validateNewUserData, validateAnonymousData } from "./validateData.js";
import { showLogged, showSignIn } from "./router.js";

function doAutoLogin() {
  //console.log('doAutoLogin');
  return new Promise(function doSaltAndHash(resolve) {
    let urlData = conf.apiUrlBase + "/auth/autoLogin";
    doAuthRequest(urlData, "POST", undefined, true, function doneAutoLogin(info) {
      info = JSON.parse(info);
      //console.log('User Data =>', info);
      resolve(info);
    });
  });
}

function doLogin(user, pass, e) {
  //console.log('doLogin');
  e.preventDefault();
  let urlData = conf.apiUrlBase + "/auth/login";

  let formBody = "";
  const k1 = encodeURIComponent("user");
  const k2 = encodeURIComponent("pass");
  const v1 = encodeURIComponent(user);
  const v2 = encodeURIComponent(pass);
  formBody = k1 + "=" + v1 + "&" + k2 + "=" + v2;
  doAuthRequest(urlData, "POST", formBody, true, function logged(data) {
    data = JSON.parse(data);
    //console.log('User Data =>', data);
    if (data.isLogged === true) {
      showLogged(data);
    }
  });
}

function doAnonymous(user, e) {
  //console.log('doAnonymous');
  e.preventDefault();
  let urlData = conf.apiUrlBase + "/online/anonymous";
  const u = {
    user: user,
  };
  const badData = validateAnonymousData(u);
  if (badData) {
    alert(badData);
    return;
  }
  let formBody = "";
  const k1 = encodeURIComponent("user");
  const v1 = encodeURIComponent(conf.anonymousPrefix + user);
  formBody = k1 + "=" + v1;
  doAuthRequest(urlData, "POST", formBody, true, function logged(data) {
    data = JSON.parse(data);
    //console.log('User Data =>', data);
    if (data.isLogged === true) {
      const sufix = `play.html?anonymous=${data.profile.nick}`;
      if (conf.mode === "dev") {
        location.href = location.href.split("/")[0] + sufix;
      } else {
        location.href += sufix;
      }
    }
  });
}

function doCreate(e) {
  e.preventDefault();
  let urlData = conf.apiUrlBase + "/auth/signup";

  const user = document.getElementById("user1").value;
  const pass = document.getElementById("pass1").value;
  const mail = document.getElementById("mail1").value;
  const logo = document.getElementById("logo1").value;
  const ques = document.getElementById("ques1").value;
  const secr = document.getElementById("secr1").value;
  const u = {
    user: user,
    pass: pass,
    mail: mail,
    logo: logo,
    ques: ques,
    secr: secr,
  };
  const badData = validateNewUserData(u);
  if (badData) {
    alert(badData);
    return;
  }
  let formBody = "";
  const k1 = encodeURIComponent("user");
  const k2 = encodeURIComponent("pass");
  const k3 = encodeURIComponent("mail");
  const k4 = encodeURIComponent("logo");
  const k5 = encodeURIComponent("ques");
  const k6 = encodeURIComponent("secr");
  const v1 = encodeURIComponent(user);
  const v2 = encodeURIComponent(pass);
  const v3 = encodeURIComponent(mail);
  const v4 = encodeURIComponent(logo);
  const v5 = encodeURIComponent(ques);
  const v6 = encodeURIComponent(secr);
  formBody = k1 + "=" + v1 + "&" + k2 + "=" + v2 + "&" + k3 + "=" + v3 + "&";
  formBody += k4 + "=" + v4 + "&" + k5 + "=" + v5 + "&" + k6 + "=" + v6;
  doAuthRequest(urlData, "POST", formBody, true, function created(data) {
    //console.log("CREATED -> ", JSON.parse(data));
    doLogin(user, pass, e);
  });
}

function doLogout() {
  //console.log('LOGOUT');
  let url = conf.apiUrlBase + "/auth/logout";
  doAuthRequest(url, "POST", null, true, function (data) {
    data = JSON.parse(data);
    //console.log('LogOut', data);
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
  doAutoLogin,
  doLogin,
  doAnonymous,
  doCreate,
  doLogout,
  getCookie
};

