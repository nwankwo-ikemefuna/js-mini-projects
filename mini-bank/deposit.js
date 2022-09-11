const currentAccountBalance = document.getElementById(
  "current-account-balance"
);

const amountToDepositInput = document.getElementById("amount-to-deposit");
const userPinInput = document.getElementById("deposit-account-pin");
const submitDepositButton = document.getElementById("submit-deposit-button");

if (!userAccountInfoInLocalStorage) {
  window.location.href = "account-profile.html";
}

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
    alert("Sorry, you are not allowed to deposit more than 1,000,000");
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
