/*  */
"use strict";

import { profile } from "../login.js";
import { conf } from "../../_config.js";

let socket;

export default async function startChat() {
  document.getElementById("send").addEventListener("click", send);
  //console.log(conf);
  socket = new WebSocket(conf.websocketUrl);

  console.log("Connected ->", profile.nick);
  var output = document.getElementById("output");
  socket.onopen = function () {
    output.innerHTML += "Status: Connected\n";
  };

  socket.onmessage = function (e) {
    output.innerHTML += "Server: " + e.data;//+ "\n";
  };

}

function send() {
  let data = {
    message: document.getElementById("input").value,
    username: profile.nick,
  };
  data = JSON.stringify(data);
  socket.send(data);
  //console.log(">>>>>>>>>>SENDING>>>>>>>>>>>>>>>\n", data);
  data = {};
}

