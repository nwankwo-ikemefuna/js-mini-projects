getCurrentBalance();

if (!currentLoggedInAccountInLocalStorage) {
  window.location.href = "landing.html";
}

const trnxnArr = getUserAccountDetails();
const paginatedTrnxnRowArr = [];

trnxnArr.transactions.forEach((trnxn) => {
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
paginate('transaction-table-body', paginatedTrnxnRowArr, 5);

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
    window.location.href = "transactions.html";
  });
});