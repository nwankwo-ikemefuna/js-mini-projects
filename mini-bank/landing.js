const createNewAccountButton = document.getElementById(
  "create-new-account-button"
);

if (!accountNameDataInLocalStorage || !accountPinDataInLocalStorage) {
  const answer = confirm(
    "You do not have an account. Do you wish to create an account?"
  );
  if (answer) {
    window.location.href = 'account-profile.html'
  }
};

createNewAccountButton.addEventListener('click', () => {
  if (!accountNameDataInLocalStorage || !accountPinDataInLocalStorage) {
      window.location.href = 'account-profile.html'
  } else {
    alert('You have an account already, Login.')
  }
})