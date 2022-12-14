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
    
    updateUserData (loggedInUserObj)
    currentAccountBalance.textContent = tranxObj.balanceAfter;
    amountToDepositInput.value = "";
    userPinInput.value = "";
  }
  window.location.href = "transactions.html";
});

getCurrentBalance();