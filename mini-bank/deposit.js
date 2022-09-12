const currentAccountBalance = document.getElementById(
  "current-account-balance"
);

const amountToDepositInput = document.getElementById("amount-to-deposit");
const userPinInput = document.getElementById("deposit-account-pin");
const submitDepositButton = document.getElementById("submit-deposit-button");

if (!currentLoggedInAccountInLocalStorage) {
  window.location.href = "landing.html";
}

submitDepositButton.addEventListener("click", (e) => {
  e.preventDefault();

  const accountDetails = getUserAccountDetails();
  console.log("PIN", accountDetails.accountPin);

  if (!amountToDepositInput.value) {
    alert("Please input amount to deposit");
    return;
  } else if (userPinInput.value !== accountDetails.accountPin) {
    alert("Incorrect PIN!");
    userPinInput.value = "";
    return;
  } else if (amountToDepositInput.value > 1000000) {
    alert("Sorry, you are cannot deposit more than 1,000,000");
    amountToDepositInput.value = "";
    userPinInput.value = "";
    return;
  } else if (
    +amountToDepositInput.value + +currentAccountBalance.textContent >
    10000000
  ) {
    alert("Balance cannot excede 10 million naira!");
    return;
  } else {
    const timeStamp = new Date();
    const trnxnRef = `TR${getDateString()}`;
    const tranxObj = {
      timeStamp: timeStamp.toLocaleString(),
      trnxnRef: trnxnRef,
      type: "credit",
      amount: amountToDepositInput.value,
      balanceBefore: +currentAccountBalance.textContent,
      balanceAfter:
        +currentAccountBalance.textContent + +amountToDepositInput.value,
    };

    const loggedInUserObj = getUserAccountDetails();
    loggedInUserObj.transactions.push(tranxObj);
    const loggedInUserIndex = userAccountInfoInLocalStorageArr.findIndex(
      (acc) => acc.accountNumber === currentLoggedInAccountInLocalStorage
    );
    userAccountInfoInLocalStorageArr[loggedInUserIndex] = loggedInUserObj;
    localStorage.setItem(
      userAccountInfoKey,
      JSON.stringify(userAccountInfoInLocalStorageArr)
    );

    currentAccountBalance.textContent = tranxObj.balanceAfter;
    amountToDepositInput.value = "";
    userPinInput.value = "";
  }
  window.location.href = "transactions.html";
});

getCurrentBalance();

const logOutButton = document.getElementById("log-out-button");

logOutButton.addEventListener("click", (event) => {
  event.preventDefault();

  const confirmBtnsContainer = createElementWithAttributes("div", {
    class: "confirm-btns-container",
  });
  const confirmBtn = createElementWithAttributes("Button", {
    class: "btn btn-primary",
  });
  confirmBtn.textContent = "Yes";
  const cancelBtn = createElementWithAttributes("Button", {
    class: "btn btn-primary",
  });
  cancelBtn.textContent = "No";
  confirmBtnsContainer.append(confirmBtn, cancelBtn);
  displayModal(
    "log-out-alert",
    "Account Info",
    "Log out of your account?",
    confirmBtnsContainer
  );

  confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem(currentAccountLoggedIn);
    window.location.href = "landing.html";
  });
  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "deposit.html";
  });
});