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