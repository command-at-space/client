/* lib */

const lib = (function () {

  function makeAjaxRequest(url, action, params, sendCookie, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      console.log('STATUS ===>>>', xhr.status);
      if (xhr.readyState === 4) { // 4 = "DONE"
        if (xhr.status === 200) { // 200 ="OK"
          if (action === 'GET' || action === 'POST') {
            try {
              callback(/*JSON.parse*/(xhr.responseText));
            } catch (e) {
              console.log('Error parsing Json => ', e);
              callback({});
            }
          } else {
            callback(xhr.status);
          }
        } else {
          console.log('Error: ' + xhr.status + "=>", xhr.responseText.length);
          showError(JSON.parse(xhr.responseText));
        }
      }
    };
    xhr.open(action, url);
    if (sendCookie) {
      xhr.withCredentials = true; // allow send cookies
    }
    if (action === 'GET') {
      xhr.send();
    } else if (action !== 'GET') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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

  function logged(data) {
    data = JSON.parse(data);
    window.location.href = data.Location;
  }

  function showError(dataError) {
    console.log('dataError => ', dataError);
    if (dataError.Error) {
      alert(dataError.Error);
    } else {
      alert('An error has ocurred while fetching data');
    }
  }

  return {
    makeAjaxRequest: makeAjaxRequest,
    showError: showError,
    logged: logged
  };
}());
