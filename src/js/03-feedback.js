import localstorageService from './localstorage';
const throttle = require('lodash.throttle');
const contactFormEl = document.querySelector('.feedback-form');
const userData = {};

const onFormFieldInput = event => {
  const { target } = event;
  const fieldName = target.name;
  const fieldValue = target.value;
  userData[fieldName] = fieldValue;
  localstorageService.save('feedback-form-state', userData);
};

const onFillContactForm = () => {
  const contactFormDataLS = localstorageService.load('feedback-form-state');
  for (const item in contactFormDataLS) {
    if (contactFormDataLS.hasOwnProperty(item)) {
      contactFormEl.elements[item].value = contactFormDataLS[item];
    }
  }
};
onFillContactForm();

const onContactFormSubmit = event => {
  const {
    elements: { email, message },
  } = event.target;
  event.preventDefault();
  if (email.value.length === 0 || message.value.length === 0) {
    return;
  }
  userData.email = contactFormEl.email.value;
  userData.message = contactFormEl.message.value;
  console.log(userData);

  localstorageService.remove('feedback-form-state');
  contactFormEl.reset();
};

contactFormEl.addEventListener('input', throttle(onFormFieldInput, 500));
contactFormEl.addEventListener('submit', onContactFormSubmit);
