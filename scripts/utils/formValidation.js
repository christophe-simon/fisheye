// DOM Elements
const firstNameElt = document.getElementById('first_name');
const lastNameElt = document.getElementById('last_name');
const emailElt = document.getElementById('email');
const messageElt = document.getElementById('message');
const firstNameErrorMessageElt = document.querySelector('#first_name_data p.error_message');
const lastNameErrorMessageElt = document.querySelector('#last_name_data p.error_message');
const emailErrorMessageElt = document.querySelector('#email_data p.error_message');
const messageErrorMessageElt = document.querySelector('#message_data p.error_message');

// Regex variables
const NAME_REGEX = /^[a-zA-ZáéíóúýÁÉÍÓÚÝàèìòùÀÈÌÒÙäëïöüÿÄËÏÖÜŸçÇæœÆŒåÅßøØãñõÃÑÕ']{2,}$/;
const nameRegex = new RegExp(NAME_REGEX);

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailRegex = new RegExp(EMAIL_REGEX);

const MESSAGE_REGEX = /^.{20,}$/;
const messageRegex = new RegExp(MESSAGE_REGEX);

// Constants
const FIRST_NAME_ELT = 'firstNameElt';
const LAST_NAME_ELT = 'lastNameElt';
const EMAIL_ELT = 'emailElt';
const MESSAGE_ELT = 'messageElt';


/**
 * Checks if a data is valid
 * @param {string} elt 
 * @returns {boolean}
 */
 const isDataValid = function (elt) {
    switch (elt) {
        case FIRST_NAME_ELT:
            return nameRegex.test(firstNameElt.value);
        case LAST_NAME_ELT:
            return nameRegex.test(lastNameElt.value);
        case EMAIL_ELT:
            return emailRegex.test(emailElt.value);
        case MESSAGE_ELT:
            return messageRegex.test(messageElt.value);
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
        firstNameElt,
        lastNameElt,
        emailElt,
        messageElt
    };

    const errorMessageElts = {
        firstNameElt: firstNameErrorMessageElt,
        lastNameElt: lastNameErrorMessageElt,
        emailElt: emailErrorMessageElt,
        messageElt: messageErrorMessageElt
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
        console.log('Le formulaire a été validé');
        const formElt = document.querySelector('form');
        formElt.style.display = 'none';
        const validationMessage = document.getElementById('successful_sending')
        validationMessage.style.display = 'block';
    } else {
        manageElementDisplay(FIRST_NAME_ELT);
        manageElementDisplay(LAST_NAME_ELT);
        manageElementDisplay(EMAIL_ELT);
        manageElementDisplay(MESSAGE_ELT);
    }
}