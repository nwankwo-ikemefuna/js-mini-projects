const profileForm = document.getElementById("profile-form");
const headerComponent = document.getElementById("header-component");
const profilePageDesc = document.getElementById("page-desc");
const newPinDesc = document.getElementById("new-pin-desc");
const confirmNewPinDesc = document.getElementById("confirm-new-pin-desc");

const accountNameInput = document.getElementById("account-name-input");
const accountNumberInput = document.getElementById("account-number-input");
const accountPinInput = document.getElementById("account-pin-input");
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

const confirmEditProfileContainer = document.getElementById(
  "confirm-edit-button-container"
);
const confirmEditProfileButton = document.getElementById(
  "confirm-edit-profile-button"
);

const randomaccountNumber = Math.random().toString().slice(2, 12);

getCurrentBalance();

if (!accountNameDataInLocalStorage || !accountPinDataInLocalStorage) {
  headerComponent.style.display = "none";
  profilePageDesc.textContent = "Create account";
  editButtonContainer.style.display = "none";
  confirmEditProfileContainer.style.display = "none";
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
    } else if (accountPinInput.value !== accountPinConfirmInput.value) {
      alert("PIN and confirm PIN do not match.");
      accountPinInput.value = "";
      accountPinConfirmInput.value = "";
      return;
    } else if (isNaN(accountPinInput.value)) {
      alert("PIN can only contain numbers.");
      return;
    } else {
      localStorage.setItem(accountNameKey, accountNameInput.value);
      localStorage.setItem(accountNumberKey, accountNumberInput.value);
      localStorage.setItem(accountPinKey, accountPinInput.value);
    }
    window.location.href = "transactions.html";
  });
} else {
  displayAccountInfo()
};

editProfileButton.addEventListener("click", (event) => {
  event.preventDefault();

  headerComponent.style.display = "none";
  profilePageDesc.textContent = "Edit Profile";
  newPinDesc.textContent = "New Pin";
  confirmNewPinDesc.textContent = "Confirm New Pin";
  editButtonContainer.style.display = "none";
  createButtonContainer.style.display = "none";
  confirmEditProfileContainer.style.display = "block";
  oldAccountPinInputContainer.style.display = "block";

  accountNameInput.disabled = false;
  accountPinInput.disabled = false;
  accountPinConfirmInput.disabled = false;
});

confirmEditProfileButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (oldAccountPinInput.value !== accountPinDataInLocalStorage) {
    alert("Incorrect old PIN!");
    oldAccountPinInput.value = "";
    return
  } else if (
    !accountPinInput.value ||
    !accountPinConfirmInput.value ||
    !oldAccountPinInput.value
  ) {
    alert("Please fill all fields");
    return
  } else {
    localStorage.setItem(accountNameKey, accountNameInput.value);
    localStorage.setItem(accountNumberKey, accountNumberInput.value);
    localStorage.setItem(accountPinKey, accountPinInput.value);
  }
  window.location.href = "account-profile.html";
});

function displayAccountInfo() {
  accountNameInput.value = accountNameDataInLocalStorage;
  accountNumberInput.value = accountNumberDataInLocalStorage;

  headerComponent.style.display = "block";
  profilePageDesc.textContent = "My Profile";
  editButtonContainer.style.display = "block";
  createButtonContainer.style.display = "none";
  confirmEditProfileContainer.style.display = "none";
}
