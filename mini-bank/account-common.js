const accountNameOnHeader = document.getElementById("header-account-name");

const accountTransactionsKey = "MB TRANSACTIONS";
const userAccountInfoKey = "MB_USER_ACCOUNT_INFO";
const currentAccountLoggedIn = "MB_CURRENTLY_LOGGED";

const currentLoggedInAccountInLocalStorage = localStorage.getItem(
  currentAccountLoggedIn
);

const userTransactionsInLocalStorage = localStorage.getItem(
  accountTransactionsKey
);
const userTransactionsInLocalStorageArr =
  JSON.parse(userTransactionsInLocalStorage) || [];

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
  userAccountInfoInLocalStorageArr[
    userAccountInfoInLocalStorageArr.length - 1
    ];
  const displayActualBalance = getCurrentAccountBalance?.balanceAfter || 0;

  currentAccountBalance.textContent = displayActualBalance;
}

// function getAccountInfosFromLocalStorage() {
//   return userAccountInfoInLocalStorageArr;
// }

function getUserAccountDetails(accountNum = currentLoggedInAccountInLocalStorage) {
  if (userAccountInfoInLocalStorageArr) {
    const data = userAccountInfoInLocalStorageArr.find(
      (account) =>
        account.accountNumber === accountNum
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