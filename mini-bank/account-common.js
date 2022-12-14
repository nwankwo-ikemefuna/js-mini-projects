const accountNameOnHeader = document.getElementById("header-account-name");
const logOutButton = document.getElementById("log-out-button");

const userAccountInfoKey = "MB_USER_ACCOUNT_INFO";
const currentAccountLoggedInKey = "MB_CURRENTLY_LOGGED";

const currentLoggedInAccountInLocalStorage = localStorage.getItem(
  currentAccountLoggedInKey
);

const userAccountsInLocalStorage = localStorage.getItem(userAccountInfoKey);
const userAccountsInLocalStorageArr =
  JSON.parse(userAccountsInLocalStorage) || [];

if (currentLoggedInAccountInLocalStorage) {
  accountNameOnHeader.textContent = getUserAccountDetails().accountName;
}

if (logOutButton) {
  logOutButton.addEventListener("click", (event) => {
    event.preventDefault();

    const onLogoutConfirm = () => {
      localStorage.removeItem(currentAccountLoggedInKey);
      window.location.href = "landing.html";
    };

    displayConfirmModal(
      "logout-confirm",
      "Logout",
      "Log out of your account?",
      onLogoutConfirm,
      { size: "modal-sm" }
    );
  });
}

function getCurrentBalance() {
  let currentAccountBalance = 0;
  const userTransactions = getUserAccountDetails().transactions || [];
  if (userTransactions.length > 0) {
    const lastUserTransaction = userTransactions[userTransactions.length - 1];
    currentAccountBalance = lastUserTransaction?.balanceAfter || 0;
  }

  const balDisplay = document.getElementById("current-account-balance");
  balDisplay.textContent = currentAccountBalance;
}

function getUserAccountDetails(
  accountNum = currentLoggedInAccountInLocalStorage
) {
  if (userAccountsInLocalStorageArr) {
    const data = userAccountsInLocalStorageArr.find(
      (account) => account.accountNumber === accountNum
    );
    return data;
  }
}

function setUserAccountsDataInLocalStorage(userAccounts) {
  localStorage.setItem(userAccountInfoKey, JSON.stringify(userAccounts));
}

function updateUserData(updateData) {
  const loggedInUserIndex = userAccountsInLocalStorageArr.findIndex(
    (acc) => acc.accountNumber === currentLoggedInAccountInLocalStorage
  );
  userAccountsInLocalStorageArr[loggedInUserIndex] = updateData;
  localStorage.setItem(
    userAccountInfoKey,
    JSON.stringify(userAccountsInLocalStorageArr)
  );
}
