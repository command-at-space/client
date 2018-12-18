/* global lib */

window.mode = "dev";
//window.mode = "production";

const play = (function () {

  let urlBase = 'https://alpha.commandatspace.com';
  if (window.mode === "dev") {
    urlBase = 'http://localhost:3000';
  }

  function init() {
    console.log('Init Play');
    console.log('COOKIES', document.cookie);
    const cookie = getCookie("playingCAS");
    console.log('COOKIE =>', cookie);
    document.getElementById("cookie").innerHTML = cookie.split(":")[1];
    document.getElementById("user").innerHTML = cookie.split(":")[0];
    document.getElementById("logout").addEventListener("click", logout);
  }

  function logout() {
    console.log('LOGOUT');
    let url = urlBase + "/v0/logout";
    lib.makeAjaxRequest(url, "POST", null, true, function (data) {
      document.cookie = 'playingCAS=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      lib.logged(data);
    });
  }

  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
      return parts.pop().split(";").shift();
    }
    return value;
  }

  return {
    init: init
  };
}());

window.addEventListener('load', play.init);

