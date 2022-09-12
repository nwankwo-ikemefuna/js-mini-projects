const accountNameOnHeader = document.getElementById("header-account-name");

const userAccountInfoKey = "MB_USER_ACCOUNT_INFO";
const currentAccountLoggedIn = "MB_CURRENTLY_LOGGED";

const currentLoggedInAccountInLocalStorage = localStorage.getItem(
  currentAccountLoggedIn
);

const userAccountInfoInLocalStorage = localStorage.getItem(userAccountInfoKey);
const userAccountInfoInLocalStorageArr =
  JSON.parse(userAccountInfoInLocalStorage) || [];

if (accountNameOnHeader) {
  accountNameOnHeader.textContent = getUserAccountDetails().accountName;
}

function getCurrentBalance() {
  const currentAccountBalance = document.getElementById(
    "current-account-balance"
  );

  const getCurrentAccountBalance =
    getUserAccountDetails().transactions.length - 1;

  const balance =
    getUserAccountDetails().transactions[getCurrentAccountBalance];

  const displayActualBalance = balance?.balanceAfter || 0;

  currentAccountBalance.textContent = displayActualBalance;
}

function getUserAccountDetails(
  accountNum = currentLoggedInAccountInLocalStorage
) {
  if (userAccountInfoInLocalStorageArr) {
    const data = userAccountInfoInLocalStorageArr.find(
      (account) => account.accountNumber === accountNum
    );
    return data;
  }
}

function setUserAccountDataInLocalStorage() {
  localStorage.setItem(
    userAccountInfoKey,
    JSON.stringify(userAccountInfoInLocalStorageArr)
  );
}

function getAllUsersFromLocalStorage() {
  return userAccountInfoInLocalStorageArr;
}