/* */
"use strict";

function showError(dataError) {
  console.log("dataError => ", dataError);
  if (dataError.error) {
    alert(dataError.error);
  } else {
    alert("An error has ocurred while fetching data");
  }
}

export {
  showError,
};
