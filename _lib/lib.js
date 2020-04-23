/* */
"use strict";

function showError(dataError) {
  console.log("dataError => ", dataError);
  if (dataError.message) {
    alert(dataError.message);
  } else {
    alert("An error has ocurred while fetching data");
  }
}

export {
  showError,
};
