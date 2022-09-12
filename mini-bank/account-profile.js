const profileForm = document.getElementById("profile-form");
const headerComponent = document.getElementById("header-component");
const profilePageDesc = document.getElementById("page-desc");
const newPinDesc = document.getElementById("new-pin-desc");
const confirmNewPinDesc = document.getElementById("confirm-new-pin-desc");

const accountNameInput = document.getElementById("account-name-input");
const accountNumberInput = document.getElementById("account-number-input");

const accountPinInputContainer = document.getElementById(
  "account-pin-input-container"
);
const accountPinInput = document.getElementById("account-pin-input");

const confirmAccountPinInputContainer = document.getElementById(
  "confirm-account-pin-input-container"
);
const accountPinConfirmInput = document.getElementById(
  "confirm-account-pin-input"
);

const oldAccountPinInputContainer = document.getElementById(
  "old-account-pin-input-container"
);
const oldAccountPinInput = document.getElementById("old-account-pin-input");

const createButtonContainer = document.getElementById(
  "create-button-container"
);
const createProfileButton = document.getElementById("create-profile-button");

const editButtonContainer = document.getElementById("edit-button-container");
const editProfileButton = document.getElementById("edit-profile-button");

const confirmEditButtonContainer = document.getElementById(
  "confirm-edit-button-container"
);
const confirmEditProfileButton = document.getElementById(
  "confirm-edit-profile-button"
);

const logOutButton = document.getElementById("log-out-button");

const randomaccountNumber = Math.random().toString().slice(2, 12);

if (!currentLoggedInAccountInLocalStorage) {
  headerComponent.style.display = "none";
  profilePageDesc.textContent = "Create account";
  accountPinInputContainer.style.display = "block";
  confirmAccountPinInputContainer.style.display = "block";
  editButtonContainer.style.display = "none";
  confirmEditButtonContainer.style.display = "none";
  logOutButton.style.display = "none";
  accountNumberInput.value = randomaccountNumber;

  accountNameInput.disabled = false;
  accountPinInput.disabled = false;
  accountPinConfirmInput.disabled = false;

  createProfileButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      (!accountNameInput.value,
      !accountPinInput.value,
      !accountPinConfirmInput.value)
    ) {
      alert("Please fill all empty fields");
      return;
    } else if (accountPinConfirmInput.value !== accountPinInput.value) {
      alert("PIN and confirm PIN do not match.");
      accountPinInput.value = "";
      accountPinConfirmInput.value = "";
      return;
    } else if (isNaN(accountPinInput.value)) {
      alert("PIN can only contain numbers.");
      accountPinInput.value = "";
      accountPinConfirmInput.value = "";
      return;
    } else {
      const userAccountInfoObj = {
        accountName: accountNameInput.value,
        accountNumber: accountNumberInput.value,
        accountPin: accountPinInput.value,
        transactions: [],
      };
      userAccountInfoInLocalStorageArr.push(userAccountInfoObj);
      setUserAccountDataInLocalStorage();
      localStorage.setItem(currentAccountLoggedIn, accountNumberInput.value);
    }
    window.location.href = "transactions.html";
  });
} else {
  displayAccountInfo();
  getCurrentBalance();
}

editProfileButton.addEventListener("click", (event) => {
  event.preventDefault();

  headerComponent.style.display = "none";
  profilePageDesc.textContent = "Edit Profile";
  newPinDesc.textContent = "New Pin";
  confirmNewPinDesc.textContent = "Confirm New Pin";
  editButtonContainer.style.display = "none";
  createButtonContainer.style.display = "none";
  accountPinInputContainer.style.display = "block";
  confirmAccountPinInputContainer.style.display = "block";
  confirmEditButtonContainer.style.display = "block";
  oldAccountPinInputContainer.style.display = "block";

  accountNameInput.disabled = false;
  accountPinInput.disabled = false;
  accountPinConfirmInput.disabled = false;
});

confirmEditProfileButton.addEventListener("click", (event) => {
  event.preventDefault();

  const accountDetails = getUserAccountDetails();

  if (!oldAccountPinInput.value) {
    alert("Input old account PIN.");
    return;
  } else if (oldAccountPinInput.value !== accountDetails.accountPin) {
    alert("Incorrect old PIN!");
    oldAccountPinInput.value = "";
    accountPinInput.value = "";
    accountPinConfirmInput.value = "";
    return;
  } else if (!accountPinInput.value) {
    dataIndexes(oldAccountPinInput.value);
    setUserAccountDataInLocalStorage();
  } else if (accountPinConfirmInput.value !== accountPinInput.value) {
    alert("PIN and confirm PIN do not match.");
    accountPinInput.value = "";
    accountPinConfirmInput.value = "";
    return;
  } else {
    dataIndexes(accountPinInput.value);
    setUserAccountDataInLocalStorage();
  }
  window.location.href = "account-profile.html";
});

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
    window.location.href = "account-profile.html";
  });
});

function displayAccountInfo() {
  const profileInfo = getUserAccountDetails();

  accountNameInput.value = profileInfo.accountName;
  accountNumberInput.value = profileInfo.accountNumber;

  headerComponent.style.display = "block";
  profilePageDesc.textContent = "My Profile";
  editButtonContainer.style.display = "block";
  createButtonContainer.style.display = "none";
  confirmEditButtonContainer.style.display = "none";
}

function dataIndexes(oldOrNew) {
  const nameIndex = userAccountInfoInLocalStorageArr.findIndex(
    (item) => item.accountName
  );
  userAccountInfoInLocalStorageArr[nameIndex].accountName =
    accountNameInput.value;
  const numberIndex = userAccountInfoInLocalStorageArr.findIndex(
    (item) => item.accountNumber
  );
  userAccountInfoInLocalStorageArr[numberIndex].accountNumber =
    accountNumberInput.value;
  const pinIndex = userAccountInfoInLocalStorageArr.findIndex(
    (item) => item.accountPin
  );
  userAccountInfoInLocalStorageArr[pinIndex].accountPin = oldOrNew;
}
