/**
 * Initialize the modal
 */
function initializeModal() {
    const formElt = document.querySelector('form');
    formElt.style.display = 'block';
    formElt.reset();

    const errorMessages = document.getElementsByClassName('error_message');
    for (message of errorMessages) {
        message.style.display = 'none';
    }

    const formDataElts = document.getElementsByClassName('formData');
    for (element of formDataElts) {
        element.setAttribute('data_error_visible', 'false');
    }

    const validationMessage = document.getElementById('successful_sending');
    validationMessage.style.display = 'none';
}

/**
 * Display the modal
 */
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    initializeModal();
}

/**
 * Close the modal
 */
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

