const currentAccountBalance = document.getElementById(
  'current-account-balance'
);

const amountToDepositInput = document.getElementById('amount-to-deposit');
const userPinInput = document.getElementById('deposit-account-pin');

const submitDepositButton = document.getElementById('submit-deposit-button');

const timeStamp = new Date();
const trnxnRef = `TR${getDateString()}`;

console.log('timeStamp', timeStamp.toLocaleString())


submitDepositButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (!amountToDepositInput.value) {
    alert('Please input amount to deposit');
    return
  } else if (userPinInput.value !== accountPinDataInLocalStorage) {
    alert('Please input your correct pin');
    userPinInput.value = '';
    return
  } else if (amountToDepositInput.value > 1000000) {
    alert('Sorry, you are not allowed to deposit more than 1,000,000');
    return;
  } else {
    const tranxObj = {
      timeStamp: timeStamp.toLocaleString(),
      trnxnRef: trnxnRef,
      type: 'credit',
      amount: amountToDepositInput.value,
      balanceBefore: +currentAccountBalance.textContent,
      balanceAfter:
        +currentAccountBalance.textContent + +amountToDepositInput.value,
    };

    userTransactionsInLocalStorageArr.push(tranxObj);
    localStorage.setItem(
      accountTransactionsKey,
      JSON.stringify(userTransactionsInLocalStorageArr)
    );
    console.log(
      'userTransactionsInLocalStorageArr',
      userTransactionsInLocalStorageArr
    );
    currentAccountBalance.textContent = tranxObj.balanceAfter;
    amountToDepositInput.value = '';
    userPinInput.value = '';
  }
  window.location.href = 'transactions.html'
});
getCurrentBalance()