const tokenKey = "token";
const user = "user";
const creditKey = "credit"

function saveToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  const myToken = getFromStorage("token");
  return myToken;
}
function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function getUserName() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else return "";
}

function getFromStorage(localStorageKey) {
  const value = localStorage.getItem(localStorageKey);
  if (value) {
    return value;
  } else {
    return [];
  }
}

function clearStorage() {
  localStorage.clear();
}

function saveCredit(credit) {
  saveToStorage(creditKey, credit);
}

function getCreditAmount() {
  const availableCredit = getFromStorage(creditKey);
  if (availableCredit) {
    return availableCredit
  } else {
    return null;
  }
}



export { getToken, saveToken, saveUser, getUserName, clearStorage, saveCredit };
