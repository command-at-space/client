/* global lib */

window.mode = "dev";
//window.mode = "production";

const alpha = (function () {

  let urlBase = 'https://alpha.commandatspace.com';
  if (window.mode === "dev") {
    urlBase = 'http://localhost:3000';
  }

  function init() {
    console.log('Init Alpha');
    //showCreateAccount();
    showSignIn();
    const showSign = document.getElementsByClassName("message")[0];
    const showCreate = document.getElementsByClassName("message")[1];
    showCreate.addEventListener("click", showCreateAccount);
    showSign.addEventListener('click', showSignIn);
    const create = document.getElementById("create");
    const login = document.getElementById("login");
    create.addEventListener("click", doCreate);
    login.addEventListener("click", doLogin);
  }

  function doCreate(e) {
    e.preventDefault();
    let urlData = urlBase + "/v0/create";

    const user1 = document.getElementById("user1").value;
    const pass1 = document.getElementById("pass1").value;
    const mail1 = document.getElementById("mail1").value;

    // form-data
    /*const formData = new FormData();
    formData.append("user1", user1);
    formData.append("pass1", pass1);
    formData.append("mail1", mail1);
    lib.makeAjaxRequest(urlData, "POST", formData, true, newAccountDone);*/

    let formBody = "";
    const k1 = encodeURIComponent("user1");
    const k2 = encodeURIComponent("pass1");
    const k3 = encodeURIComponent("mail1");
    const v1 = encodeURIComponent(user1);
    const v2 = encodeURIComponent(pass1);
    const v3 = encodeURIComponent(mail1);
    formBody = k1 + "=" + v1 + "&" + k2 + "=" + v2 + "&" + k3 + "=" + v3;
    lib.makeAjaxRequest(urlData, "POST", formBody, true, lib.logged);

  }

  function doLogin(e) {
    e.preventDefault();
    let urlData = urlBase + "/v0/login";

    const user2 = document.getElementById("user2").value;
    const pass2 = document.getElementById("pass2").value;

    let formBody = "";
    const k1 = encodeURIComponent("user2");
    const k2 = encodeURIComponent("pass2");
    const v1 = encodeURIComponent(user2);
    const v2 = encodeURIComponent(pass2);
    formBody = k1 + "=" + v1 + "&" + k2 + "=" + v2;
    //console.log(formBody);
    lib.makeAjaxRequest(urlData, "POST", formBody, true, lib.logged);
  }

  function showCreateAccount(e) {
    //console.log('Show Create Account');
    document.getElementsByClassName("registerForm")[0].style.display = "block";
    document.getElementsByClassName("loginForm")[0].style.display = "none";
  }

  function showSignIn(e) {
    //console.log('Sign In');
    document.getElementsByClassName("registerForm")[0].style.display = "none";
    document.getElementsByClassName("loginForm")[0].style.display = "block";
  }

  return {
    init: init
  };
}());

window.addEventListener('load', alpha.init);

