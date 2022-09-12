const accountSelectInput = document.getElementById(
  "account-select"
);

const userAccountsForSelect = userAccountInfoInLocalStorageArr.map(userAccount => {
  userAccount.accountName = `${userAccount.accountName} (${userAccount.accountPin})`;
  return userAccount;
});
createSelectOptions(userAccountsForSelect, accountSelectInput, 'accountNumber', 'accountName');

const loginForm = document.getElementById("account-login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const accountNumber = accountSelectInput.value;
  if (!accountNumber) {
    alert("No account selected!");
    return;
  }

  localStorage.setItem(currentAccountLoggedInKey, accountNumber);
  window.location.href = "transactions.html";
});