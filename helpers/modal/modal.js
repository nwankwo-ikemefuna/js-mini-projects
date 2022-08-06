
function createModal(modalId, headerTitle, content = null) {
  
  // modal header
  const modalHeaderContainer = createElementWithAttributes('div', { class: 'modal-header' });
  const modalClose = createElementWithAttributes('span', { 
    class: 'close',
    id: 'modal-close',
  });
  modalClose.append('x');
  const modalTitle = document.createElement('h3');
  modalTitle.textContent = headerTitle;
  modalHeaderContainer.append(modalClose, modalTitle);

  // modal body
  const modalBodyContainer = createElementWithAttributes('div', { class: 'modal-body' });
  if (content) {
    modalBodyContainer.append(content);
  }

  // modal content
  const modalContentContainer = createElementWithAttributes('div', { class: 'modal-content' });
  modalContentContainer.append(modalHeaderContainer, modalBodyContainer);
  
  // the modal container
  const modalContainer = createElementWithAttributes('div', { 
    class: 'modal', 
    id: modalId, 
  });
  modalContainer.append(modalContentContainer);

  //append to current document body
  document.body.appendChild(modalContainer);
}

function displayModal(modalId, modalTriggerId, content = null) {
  // Get the modal
  const modal = document.getElementById(modalId);

  // Get the button that opens the modal
  const modalDisplayTrigger = document.getElementById(modalTriggerId);

  // Get the <span> element that closes the modal
  const modalCloseTrigger = document.getElementById('modal-close');

  if (content) {
    const modalBody = modal.querySelector('.modal-body');
    modalBody.append(content);
  }

  // When the user clicks the button, open the modal 
  modalDisplayTrigger.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks close, close the modal
  modalCloseTrigger.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}