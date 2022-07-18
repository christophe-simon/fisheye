/**
 * Initialize the modal
 */
function initializeModal() {
    const $form = document.querySelector('form');
    $form.style.display = 'block';
    $form.reset();

    const $errorMessages = document.getElementsByClassName('error_message');
    for (message of $errorMessages) {
        message.style.display = 'none';
    }

    const $formData = document.getElementsByClassName('formData');
    for (element of $formData) {
        element.setAttribute('data_error_visible', 'false');
    }

    const $validationMessage = document.getElementById('successful_sending');
    $validationMessage.style.display = 'none';
}

/**
 * Display the modal
 */
function displayModal() {
    const $modal = document.getElementById('contact_modal');
	$modal.showModal();
    initializeModal();
}

/**
 * Close the modal
 */
function closeModal() {
    const $modal = document.getElementById('contact_modal');
    $modal.close();
}

