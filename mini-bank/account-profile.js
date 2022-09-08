const profileForm = document.getElementById("profile-form");
const headerComponent = document.getElementById("header-component");
const profilePageDesc = document.getElementById("page-desc");

const accountNameInput = document.getElementById("account-name-input");
const accountNumberInput = document.getElementById("account-number-input");
const accountPinInput = document.getElementById("account-pin-input");
const accountPinConfirmInput = document.getElementById(
  "confirm-account-pin-input"
);

const createButtonContainer = document.getElementById(
  "create-button-container"
);
const createProfileButton = document.getElementById("create-profile-button");

const editButtonContainer = document.getElementById("edit-button-container");
const editProfileButton = document.getElementById("edit-profile-button");

const randomaccountNumber = Math.random().toString().slice(2, 12);

getCurrentBalance();

if (!accountNameDataInLocalStorage || !accountPinDataInLocalStorage) {
  headerComponent.style.display = "none";
  profilePageDesc.textContent = "Create account";
  editButtonContainer.style.display = "none";
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
      alert("Incorrect pin confirmation. Please confirm correct pin.");
      accountPinInput.value = "";
      accountPinConfirmInput.value = "";
      return;
    } else {
      localStorage.setItem(accountNameKey, accountNameInput.value);
      localStorage.setItem(accountNumberKey, accountNumberInput.value);
      localStorage.setItem(accountPinKey, accountPinInput.value);
    }
    window.location.href = "transactions.html";
  });
} else {
  accountNameInput.value = accountNameDataInLocalStorage;
  accountNumberInput.value = accountNumberDataInLocalStorage;
  accountPinInput.value = accountPinDataInLocalStorage;
  accountPinConfirmInput.value = accountPinDataInLocalStorage;

  headerComponent.style.display = "block";
  profilePageDesc.textContent = "My Profile";
  editButtonContainer.style.display = "block";
  createButtonContainer.style.display = "none";
}
