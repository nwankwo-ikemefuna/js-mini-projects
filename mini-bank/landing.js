const createNewAccountButton = document.getElementById(
  "create-new-account-button"
);
const landingPageDesc = document.getElementById('page-desc');

if (!userAccountInfoInLocalStorage) {
  const answer = confirm(
    "You do not have an account. Do you wish to create an account?"
  );
  if (answer) {
    window.location.href = 'account-profile.html'
  }
} else {
  landingPageDesc.innerHTML = ''
  createNewAccountButton.style.display = 'none'
}

createNewAccountButton.addEventListener('click', () => {
  if (!userAccountInfoInLocalStorage) {
      window.location.href = 'account-profile.html'
  }
})
