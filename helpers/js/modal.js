
function createModal(modalId, headerTitle, bodyContent, footerContent = null, extra = {}) {

  const { size: modalSizeClass = '', maxWidth: modalMaxWidth = '' } = extra;

  // modal content
  const modalContentContainer = createElementWithAttributes('div', { class: 'modal-content' });
  if (modalSizeClass) {
    modalContentContainer.classList.add(modalSizeClass);
  }
  if (modalMaxWidth) {
    modalContentContainer.style.maxWidth = modalMaxWidth;
  }
  
  // modal header
  const modalHeaderContainer = createElementWithAttributes('div', { class: 'modal-header' });
  const modalClose = createElementWithAttributes('span', { class: 'close' });
  modalClose.innerHTML = '&times;';
  const modalTitle = document.createElement('h3');
  modalTitle.textContent = headerTitle;
  modalHeaderContainer.append(modalClose, modalTitle);

  // modal body
  const modalBodyContainer = createElementWithAttributes('div', { class: 'modal-body' });
  modalBodyContainer.append(bodyContent);

  modalContentContainer.append(modalHeaderContainer, modalBodyContainer);

  // modal footer
  const modalFooterContainer = createElementWithAttributes('div', { class: 'modal-footer' });
  if (footerContent) {
    modalFooterContainer.append(footerContent);
    modalContentContainer.append(modalFooterContainer);
  }
  
  // the modal container
  const modalContainer = createElementWithAttributes('div', { 
    class: 'modal', 
    id: modalId, 
  });
  modalContainer.append(modalContentContainer);

  //append to current document body
  document.body.appendChild(modalContainer);

  return modalContainer;
}

function displayModal(modalId, headerTitle, bodyContent, footerContent = null, extra = {}) {
  const { closeOnClickOutside = true } = extra;

  // Get the modal
  let modal = document.getElementById(modalId);
  if (!modal) {
    //create the modal since it hasn't been created on the dom yet
    modal = createModal(modalId, headerTitle, bodyContent, footerContent, extra);
  }

  // render the content in the modal body
  const modalBody = modal.querySelector('.modal-body');
  modalBody.innerHTML = "";
  modalBody.append(bodyContent);

  // render the modal footer content
  if (footerContent) {
    const modalFooter = modal.querySelector('.modal-footer');
    modalFooter.innerHTML = "";
    modalFooter.append(footerContent);
  }

  //display the modal
  modal.style.display = "block";

  // When the user clicks close, close the modal
  const modalCloseTrigger = modal.querySelector('.close');
  modalCloseTrigger.onclick = function() {
    closeModal(modal);
  }
  
  // When the user clicks anywhere outside of the modal, close it
  if (closeOnClickOutside) {
    window.onclick = function(event) {
      if (event.target == modal) {
        closeModal(modal);
      }
    }
  }

  return modal;
}

function displayConfirmModal(modalId, headerTitle, bodyContent, onConfirmButtonClick, extra = {}) {
  
  const confirmBtn = createElementWithAttributes("button", {
    textContent: 'Yes',
    class: "btn btn-success",
  });

  const cancelBtn = createElementWithAttributes("button", {
    textContent: 'Cancel',
    class: "btn btn-secondary",
  });

  const footerButtonsContainer = createElementWithAttributes("div", {
    class: "modal-confirm-buttons",
  });
  footerButtonsContainer.append(confirmBtn, cancelBtn);
  
  const confirmModal = displayModal(
    modalId,
    headerTitle,
    bodyContent,
    footerButtonsContainer,
    extra
  );

  // confirm button click
  if (typeof onConfirmButtonClick === 'function') {
    confirmBtn.addEventListener("click", (event) => {
      event.preventDefault();
      onConfirmButtonClick();
    });
  }

  // cancel button click
  cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    closeModal(confirmModal);
  });

  return confirmModal;
}

function closeModal(modal) {
  modal.style.display = "none";
  document.body.removeChild(modal);
}