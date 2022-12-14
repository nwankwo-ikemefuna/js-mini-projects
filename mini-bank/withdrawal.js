const currentAccountBalance = document.getElementById(
  "current-account-balance"
);

const amountToWithdrawInput = document.getElementById("amount-to-withdraw");
const userPinInput = document.getElementById("withdrawal-account-pin");

const submitWithdrawButton = document.getElementById("submit-withdraw-button");

if (!currentLoggedInAccountInLocalStorage) {
  window.location.href = "landing.html";
}

submitWithdrawButton.addEventListener("click", (e) => {
  e.preventDefault();

  const accountDetails = getUserAccountDetails();

  if (!amountToWithdrawInput.value) {
    alert("Please input amount to withdraw");
    return;
  } else if (userPinInput.value !== accountDetails.accountPin) {
    alert("Incorrect PIN!");
    userPinInput.value = "";
    return;
  } else if (amountToWithdrawInput.value > 1000000) {
    alert("Sorry, you are not allowed to deposit more than 1,000,000.");
    return;
  } else if (amountToWithdrawInput.value > +currentAccountBalance.textContent) {
    alert("Sorry, you cannot withdraw more than your balance.");
    amountToWithdrawInput.value = "";
    userPinInput.value = "";
    return;
  } else if (+currentAccountBalance.textContent <= 100) {
    alert("Sorry, your balance cannot go below #100");
    return;
  } else {
    const timeStamp = new Date();
    const trnxnRef = `TR${getDateString()}`;
    const tranxObj = {
      timeStamp: timeStamp.toLocaleString(),
      trnxnRef: trnxnRef,
      type: "debit",
      amount: amountToWithdrawInput.value,
      balanceBefore: +currentAccountBalance.textContent,
      balanceAfter:
        +currentAccountBalance.textContent - +amountToWithdrawInput.value,
    };

    const loggedInUserObj = getUserAccountDetails();
    loggedInUserObj.transactions.push(tranxObj);
    updateUserData (loggedInUserObj);

    currentAccountBalance.textContent = tranxObj.balanceAfter;
    amountToWithdrawInput.value = "";
    userPinInput.value = "";
  }
  window.location.href = "transactions.html";
});

getCurrentBalance();