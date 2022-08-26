// DOM Elements
const $firstName = document.getElementById('first_name');
const $lastName = document.getElementById('last_name');
const $email = document.getElementById('email');
const $message = document.getElementById('message');
const $firstNameErrorMessage = document.querySelector('#first_name_data p.error_message');
const $lastNameErrorMessage = document.querySelector('#last_name_data p.error_message');
const $emailErrorMessage = document.querySelector('#email_data p.error_message');
const $messageErrorMessage = document.querySelector('#message_data p.error_message');

// Regex variables
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailRegex = new RegExp(EMAIL_REGEX);

// Constants
const FIRST_NAME_ELT = '$firstName';
const LAST_NAME_ELT = '$lastName';
const EMAIL_ELT = '$email';
const MESSAGE_ELT = '$message';


/**
 * Checks if a data is valid
 * @param {string} elt 
 * @returns {boolean}
 */
const isDataValid = function (elt) {
  switch (elt) {
    case FIRST_NAME_ELT:
      return $firstName.value.length >= 2 ? true : false;
    case LAST_NAME_ELT:
      return $lastName.value.length >= 2 ? true : false;
    case EMAIL_ELT:
      return emailRegex.test($email.value);
    case MESSAGE_ELT:
      return $message.value.length >= 20 ? true : false;
    default:
      throw 'Pas de donnée de ce type';
  }
}

/**
 * Display correctly (in casual mode or in error mode) an element whether its value is valid or not
 * @param {string} elt 
 */
const manageElementDisplay = function (elt) {
  const elements = {
    $firstName,
    $lastName,
    $email,
    $message
  };

  const errorMessageElts = {
    $firstName: $firstNameErrorMessage,
    $lastName: $lastNameErrorMessage,
    $email: $emailErrorMessage,
    $message: $messageErrorMessage
  };

  if (elt !== null && isDataValid(elt)) {
    elements[elt].parentElement.setAttribute('data_error_visible', 'false');
    errorMessageElts[elt].style.display = 'none';
  } else {
    elements[elt].parentElement.setAttribute('data_error_visible', 'true');
    errorMessageElts[elt].style.display = 'block';
  }
}

/**
 * Checks if the form is valid
 * @returns {boolean}
 */
const isFormValid = function () {
  return (
    isDataValid(FIRST_NAME_ELT) &&
        isDataValid(LAST_NAME_ELT) &&
        isDataValid(EMAIL_ELT) &&
        isDataValid(MESSAGE_ELT)
  );
}

/**
 * Checks if the form is valid and display a validation message in this case, or display the errors if there are any
 */
const manageValidation = function (evt) {
  // console.log(evt);
  evt.preventDefault();

  if (isFormValid()) {
    const firstName = $firstName.value;
    const lastName = $lastName.value;
    const email = $email.value;
    const message = $message.value;
    console.log('Le formulaire a été validé. Voici les informations.');
    console.log('Prénom: ' + firstName);
    console.log('Nom: ' + lastName);
    console.log('Email: ' + email);
    console.log('Message: ' + message);
    const $form = document.querySelector('form');
    $form.style.display = 'none';
    const $validationMessage = document.getElementById('successful_sending');
    $validationMessage.style.display = 'block';
  } else {
    manageElementDisplay(FIRST_NAME_ELT);
    manageElementDisplay(LAST_NAME_ELT);
    manageElementDisplay(EMAIL_ELT);
    manageElementDisplay(MESSAGE_ELT);
  }
}