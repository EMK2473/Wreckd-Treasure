export const getSavedShipWreckIds = () => {
  const savedShipWreckIds = localStorage.getItem('saved_shipWrecks')
    ? JSON.parse(localStorage.getItem('saved_shipWrecks'))
    : [];

  return savedShipWreckIds;
}; // checks if there is any data saved under the key 'saved_shipWrecks' in local storage.
// If data is found, it parses and returns the array of saved shipWreck IDs; otherwise, it returns an empty array.

export const saveShipWreckIds = (shipWreckIdArr) => {
  if (shipWreckIdArr.length) {
    localStorage.setItem('saved_shipWrecks', JSON.stringify(shipWreckIdArr));
  } else {
    localStorage.removeItem('saved_shipWrecks');
  }
}; // checks if the array has any elements. If it does. it saves the array to local storage under "saved_shipWrecks" after converting to JSON
// If the array is empty, it removes the 'saved_shipWrecks' key from local storage.

export const removeShipWreckId = (shipWreckId) => {
  const savedShipWreckIds = localStorage.getItem('saved_shipWrecks')
    ? JSON.parse(localStorage.getItem('saved_shipWrecks'))
    : null;

  if (!savedShipWreckIds) {
    return false;
  }

  const updatedSavedShipWreckIds = savedShipWreckIds?.filter((savedShipWreckId) => savedShipWreckId !== shipWreckId);
  localStorage.setItem('saved_shipWrecks', JSON.stringify(updatedSavedShipWreckIds));

  return true;
}; // retrieves the current saved shipWreck IDS from local storage
// if no saved shipWreck ids, then returns false
// filters out the specified shipWreckID from the array
// saves the updated array in local storage