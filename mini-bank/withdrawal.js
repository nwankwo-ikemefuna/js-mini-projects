const currentAccountBalance = document.getElementById('current-account-balance')

const amountToWithdrawInput = document.getElementById("amount-to-withdraw");
const userPinInput = document.getElementById("withdrawal-account-pin");

const submitWithdrawButton = document.getElementById("submit-withdraw-button");

const timeStamp = new Date();
const trnxnRef = `TR${getDateString()}`;

getCurrentBalance()

submitWithdrawButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!amountToWithdrawInput.value) {
    alert("Please input amount to withdraw");
    return;
  } else if (userPinInput.value !== accountPinDataInLocalStorage) {
    alert("Please input your correct pin");
    userPinInput.value = "";
    return;
  } else if (amountToWithdrawInput.value > 1000000) {
    alert("Sorry, you are not allowed to deposit more than 1,000,000.");
    return;
  } else if (amountToWithdrawInput.value > +currentAccountBalance.textContent) {
    alert("Sorry, you cannot withdraw more than your balance.");
    return;
  } else if (+currentAccountBalance.textContent <= 100) {
    alert("Sorry, your balance cannot go below #100");
  } else {
    const tranxObj = {
      timeStamp: timeStamp.toLocaleString(),
      trnxnRef: trnxnRef,
      type: "debit",
      amount: amountToWithdrawInput.value,
      balanceBefore: +currentAccountBalance.textContent,
      balanceAfter:
        +currentAccountBalance.textContent - +amountToWithdrawInput.value,
    };

    userTransactionsInLocalStorageArr.push(tranxObj);
    localStorage.setItem(
      accountTransactionsKey,
      JSON.stringify(userTransactionsInLocalStorageArr)
    );
    console.log(
      "userTransactionsInLocalStorageArr",
      userTransactionsInLocalStorageArr
    );
    currentAccountBalance.textContent = tranxObj.balanceAfter;
    amountToWithdrawInput.value = "";
    userPinInput.value = "";
  }
  window.location.href = 'transactions.html'
});
