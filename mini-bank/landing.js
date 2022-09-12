const createNewAccountButton = document.getElementById(
  "create-new-account-button"
);
const landingPageDesc = document.getElementById("page-desc");

const loginAccountNameInput = document.getElementById(
  "login-account-name-input"
);
const loginAccountPinInput = document.getElementById("login-account-pin-input");

const loginFormContainer = document.getElementById("login-form-container");
const loginButton = document.getElementById("account-login-button");
const pageDescHolder = document.getElementById("page-desc-holder");

if (!userAccountInfoInLocalStorage) {
  loginFormContainer.style.display = "none";
  pageDescHolder.style.display = "none";
  const answer = confirm(
    "You do not have an account. Do you wish to create an account?"
  );
  if (answer) {
    window.location.href = "account-profile.html";
  }
} else {
  landingPageDesc.innerHTML = "";
  createNewAccountButton.style.display = "none";
  loginFormContainer.style.display = "flex";
  pageDescHolder.style.display = "flex";
}

loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (!loginAccountNameInput.value || !loginAccountPinInput.value) {
    alert("Enter your account details.");
    return;
  }

  const getAllUser = getAllUsersFromLocalStorage();
  getAllUser.forEach((user) => {
    if (
      loginAccountNameInput.value === user.accountName &&
      loginAccountPinInput.value === user.accountPin
    ) {
      localStorage.setItem(currentAccountLoggedIn, user.accountNumber);

      loginAccountNameInput.value = "";
      loginAccountPinInput.value = "";

      window.location.href = "transactions.html";
    } else if (
      loginAccountNameInput.value === user.accountName &&
      loginAccountPinInput.value !== user.accountPin
    ) {
      alert("You have entered a wrong PIN! Try again.");
      loginAccountPinInput.value = "";
    } else if (
      loginAccountNameInput.value !== user.accountName &&
      loginAccountPinInput.value !== user.accountPin
    ) {
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

      confirmBtn.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "account-profile.html";
      });
      cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "landing.html";
      });
      displayModal(
        "wrong-input",
        "Account Info",
        "This account does not Exist! Create an account?",
        confirmBtnsContainer
      );
    }
  });
});

createNewAccountButton.addEventListener("click", () => {
  if (!userAccountInfoInLocalStorage) {
    window.location.href = "account-profile.html";
  }
});
