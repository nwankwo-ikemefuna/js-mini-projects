const createNewAccountButton = document.getElementById(
  "create-new-account-button"
);
const confrimNewAccountButton = document.getElementById(
  "confrim-new-account-button"
);
const createAccountFormHolder = document.getElementById(
  "create-account-form-holder"
);
const createAccountPageDesc = document.getElementById("page-desc");

const randomAccountNumber = Math.random().toString().slice(2, 12);

createNewAccountButton.addEventListener("click", () => {
  createAccountPageDesc.style.display = "none";
  createNewAccountButton.style.display = "none";
  createAccountFormHolder.removeAttribute("class");

  const createAccountFormContainer = createElementWithAttributes("div", {
    class: "container-fixed header-component",
  });
  const createAccountForm = createElementWithAttributes("form");
  const accountNameContainer = createElementWithAttributes("div", {
    class: "form-group",
  });
  const accountNameLabel = createElementWithAttributes("label");
  accountNameLabel.textContent = "Account Name";
  const accountNameInput = createElementWithAttributes("input", {
    class: "form-control",
    type: "text",
    id: "account-name-input",
  });
  const accountNumberContainer = createElementWithAttributes("div", {
    class: "form-group",
  });
  const accountNumberLabel = createElementWithAttributes("label");
  accountNumberLabel.textContent = "Account Number";
  const accountNumberInput = createElementWithAttributes("input", {
    class: "form-control",
    type: "number",
    id: "account-number-input",
    readonly: "readonly",
  });
  accountNumberInput.value = randomAccountNumber;
  const accountPinContainer = createElementWithAttributes("div", {
    class: "form-group",
  });
  const accountPinLabel = createElementWithAttributes("label");
  accountPinLabel.textContent = "Set Pin";
  const accountPinInput = createElementWithAttributes("input", {
    class: "form-control",
    type: "password",
    id: "account-pin-input",
  });
  const accountPinConfirmContainer = createElementWithAttributes("div", {
    class: "form-group",
  });
  const accountPinConfirmLabel = createElementWithAttributes("label");
  accountPinConfirmLabel.textContent = "Confirm Pin";
  const accountPinConfirmInput = createElementWithAttributes("input", {
    class: "form-control",
    type: "password",
    id: "account-pin-confirm-input",
  });

  confrimNewAccountButton.style.display = "block";
  confrimNewAccountButton.addEventListener('click', () => {
    if (
      !accountNameInput.value,
      !accountPinInput.value,
      !accountPinConfirmInput.value
    ) {
      return
    } else {
      window.location.href = 'account-profile.html'
    }
  })

  createAccountFormHolder.prepend(createAccountFormContainer);
  createAccountFormContainer.appendChild(createAccountForm);
  createAccountForm.append(
    accountNameContainer,
    accountNumberContainer,
    accountPinContainer,
    accountPinConfirmContainer
  );
  accountNameContainer.append(accountNameLabel, accountNameInput);
  accountNumberContainer.append(accountNumberLabel, accountNumberInput);
  accountPinContainer.append(accountPinLabel, accountPinInput);
  accountPinConfirmContainer.append(
    accountPinConfirmLabel,
    accountPinConfirmInput
  );
});
