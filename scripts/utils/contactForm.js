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
    const $body = document.getElementById('body');
    const $header = document.getElementById('header');
    const $main = document.getElementById('main');
    const $lightbox = document.getElementById('lightbox');
    const $modal = document.getElementById('contact_modal');
    const $firstName = document.getElementById('first_name');
    $header.setAttribute('aria-hidden', 'true');
    $main.setAttribute('aria-hidden', 'true');
    $lightbox.setAttribute('aria-hidden', 'true');
    $modal.setAttribute('aria-hidden', 'false');
    $body.classList.add('no-scroll');
    $modal.style.display = 'block';
	//$modal.showModal();
    initializeModal();
    $firstName.focus();
}

/**
 * Close the modal
 */
function closeModal() {
    const $body = document.getElementById('body');
    const $header = document.getElementById('header');
    const $main = document.getElementById('main');
    const $lightbox = document.getElementById('lightbox');
    const $modal = document.getElementById('contact_modal');
    const $contactButton = document.querySelector('.contact_button');
    $header.setAttribute('aria-hidden', 'false');
    $main.setAttribute('aria-hidden', 'false');
    $lightbox.setAttribute('aria-hidden', 'true');
    $modal.setAttribute('aria-hidden', 'true');
    $body.classList.remove('no-scroll');
    $modal.style.display = 'none';
    //$modal.close();
    $contactButton.focus();
}

