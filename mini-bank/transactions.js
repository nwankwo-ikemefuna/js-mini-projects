getCurrentBalance();

if (!currentLoggedInAccountInLocalStorage) {
  window.location.href = "landing.html";
}

const clearTrnxnsButtonContainer = document.getElementById(
  "clear-trnxns-button-container"
);

const loggedInUserObj = getUserAccountDetails();
const trnxnArr = loggedInUserObj.transactions;
const paginatedTrnxnRowArr = [];

if (trnxnArr.length > 0) {
  clearTrnxnsButtonContainer.style.display = "flex";
}

trnxnArr.forEach((trnxn) => {
  const tdTimestamp = createElementWithAttributes("td");
  tdTimestamp.textContent = trnxn.timeStamp;

  const tdTrnxnRef = createElementWithAttributes("td");
  tdTrnxnRef.textContent = trnxn.trnxnRef;

  const tdType = createElementWithAttributes("td");
  tdType.textContent = trnxn.type;

  const tdAmount = createElementWithAttributes("td");
  tdAmount.textContent = trnxn.amount;

  const tdBalBefore = createElementWithAttributes("td");
  tdBalBefore.textContent = trnxn.balanceBefore;

  const tdBalAfter = createElementWithAttributes("td");
  tdBalAfter.textContent = trnxn.balanceAfter;

  const trnxnRow = createElementWithAttributes("tr");
  trnxnRow.append(
    tdTimestamp,
    tdTrnxnRef,
    tdType,
    tdAmount,
    tdBalBefore,
    tdBalAfter
  );
  paginatedTrnxnRowArr.push(trnxnRow);
});
paginate("transaction-table-body", paginatedTrnxnRowArr, 5);

const clearTrnxnsButton = document.getElementById("clear-trnxns-button");

clearTrnxnsButton.addEventListener("click", (event) => {
  event.preventDefault();

  const onClearTrnxnsConfirm = () => {
    loggedInUserObj.transactions = [];
    updateUserData (loggedInUserObj)
    window.location.href = "transactions.html";
  };

  displayConfirmModal(
    "clear-trnxns-confirm",
    "Clear Transactions",
    "Are you sure you want to clear all transactions from your account? This action cannot be reversed.",
    onClearTrnxnsConfirm,
    { size: "modal-sm" }
  );
});
