/* */
"use strict";

import { showError } from "./lib.js";

export default function doRequest(url, action, params, sendCookie, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    //console.log("STATUS ===>>>", xhr.status);
    if (xhr.readyState === 4) { // 4 = "DONE"
      if (xhr.status === 200) { // 200 ="OK"
        if (action === "GET" || action === "POST") {
          try {
            callback(/*JSON.parse*/ xhr.responseText);
          } catch (e) {
            //console.error("Error parsing Json => ", e);
            callback({});
          }
        } else {
          callback(xhr.status);
        }
      } else {
        console.error("Error:" + xhr.status + "=>", xhr.responseText.length);
        if (xhr.status !== 0 && xhr.status !== 502) {
          showError(JSON.parse(xhr.responseText));
        } else {
          showError(xhr.responseText);
        }
      }
    }
  };
  xhr.open(action, url);
  if (sendCookie) {
    //console.log('SEND COOKIES');
    xhr.withCredentials = true; // allow send cookies
  }
  if (action === "GET") {
    xhr.send();
  } else if (action !== "GET") {
    xhr.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    //xhr.setRequestHeader("Content-type", 'multipart/form-data');
    if (params) {
      //console.log('Send =>', params);
      xhr.send(params);
    } else {
      xhr.send();
    }
    // console.log('Request Sent')
  }
}
