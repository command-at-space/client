/* */
"use strict";

const validChars = "abcdefghijklmnopqrstuvwxyz0123456789";

function validateNewUserData(u) {
  //console.log(u);
  let response = "";
  if (u.user.length < 4 || u.user.length > 16) {
    response += "Name between 4-16 characters\n";
  }
  if (!u.user.toLowerCase().split("").every(isValidChar)) {
    response += "Name only can contain numbers and letters\n";
  }
  if (u.pass.length < 8 || u.pass.length > 20) {
    response += "Password between 8-20 any characters\n";
  }
  if (u.mail !== "" && !isValidEmail(u.mail)) {
    response += "Please use a valid email address\n";
  }
  if (u.mail.length > 60) {
    response += "Email adress maximun length 60 characters\n";
  }
  if (u.logo !== "" && !isValidLogo(u.logo)) {
    response += "Logo url is not a valid jpeg,jpg,png or gif file\n";
  }
  if (u.logo.length > 120) {
    response += "Logo url maximun length 120 characters\n";
  }
  if (u.ques.length > 80) {
    response += "Secret question maximun length 80 characters\n";
  }
  if (u.secr.length > 20) {
    response += "Secret response maximun length 20 characters\n";
  }
  if (u.ques !== "" && u.secr === "") {
    response += "Fill secret response\n";
  }
  if (u.ques === "" && u.secr !== "") {
    response += "Fill secret question\n";
  }
  //console.log(response);
  return response;
}

function validateAnonymousData(u) {
  let response = "";
  if (u.user.length < 4 || u.user.length > 8) {
    response += "Name between 4-8 characters\n";
  }
  if (!u.user.toLowerCase().split("").every(isValidChar)) {
    response += "Name only can contain numbers and letters\n";
  }
  return response;
}

function isValidChar(val) {
  return validChars.indexOf(val) !== -1;
}

function isValidEmail(url) {
  return /^\S+@\S+\.\S+$/.test(url);
}

function isValidLogo(url) {
  return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

export {
  validateNewUserData,
  validateAnonymousData
};
