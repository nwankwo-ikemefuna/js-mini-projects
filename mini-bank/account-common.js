const accountNameOnHeader = document.getElementById("header-account-name");

// let trxnType =

const accountNameKey = "MB_ACCOUNT_NAME";
const accountNumberKey = "MB_ACCOUNT_NUMBER";
const accountPinKey = "MB_ACCOUNT_PIN";
const accountTransactionsKey = "TRANSACTIONS";

const accountNameDataInLocalStorage = localStorage.getItem(accountNameKey);

const accountNumberDataInLocalStorage = localStorage.getItem(accountNumberKey);

const accountPinDataInLocalStorage = localStorage.getItem(accountPinKey);

const userTransactionsInLocalStorage = localStorage.getItem(
  accountTransactionsKey
);
const userTransactionsInLocalStorageArr =
  JSON.parse(userTransactionsInLocalStorage) || [];

if (accountNameOnHeader) {
  accountNameOnHeader.textContent = accountNameDataInLocalStorage;
}

function getCurrentBalance() {
  const currentAccountBalance = document.getElementById(
    "current-account-balance"
  );

  const getCurrentAccountBalance =
    userTransactionsInLocalStorageArr[
      userTransactionsInLocalStorageArr.length - 1
    ];
  const displayActualBalance = getCurrentAccountBalance?.balanceAfter || 0;

  currentAccountBalance.textContent = displayActualBalance;
}

function getTransactionFromLocalStorage() {
  return userTransactionsInLocalStorageArr;
}
