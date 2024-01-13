const form = document.getElementById('card-details-form');

const displayErrorMsg = (elementId, msgId, msgText, containerId) => {
  const existingErrorMsg = document.getElementById(msgId);

  if (!existingErrorMsg) {
    document.getElementById(elementId).classList.add('error-outline');
    const msgEl = document.createElement('p');
    msgEl.setAttribute('id', msgId);
    msgEl.classList.add('error-msg');
    msgEl.textContent = msgText;
    document.getElementById(containerId).appendChild(msgEl);
  }
};

const removeErrorMsg = (elementId, msgId) => {
  const existingErrorMsg = document.getElementById(msgId);
  if (existingErrorMsg) {
    document.getElementById(elementId).classList.remove('error-outline');
    const msgEl = document.getElementById(msgId);
    msgEl.remove();
  }
};

const validateName = (fullName) => {
  const errorMsg = 'Please enter between 2 and 50 characters';
  const nameElementId = 'fullName';
  const nameErrorMsgId = 'name-error';

  if (!fullName) {
    displayErrorMsg(
      nameElementId,
      nameErrorMsgId,
      errorMsg,
      'full-name-container'
    );
    return false;
  } else {
    removeErrorMsg(nameElementId, nameErrorMsgId);
    return true;
  }
};

const validateCardNumber = (cardNumber) => {
  const errorMsg = 'Please enter valid card number';
  const cardElementId = 'cardNumber';
  const cardErrorMsgId = 'card-number-error';

  switch (true) {
    case cardNumber.length === 0:
      displayErrorMsg(
        cardElementId,
        cardErrorMsgId,
        errorMsg,
        'card-number-container'
      );
      return false;
    case cardNumber.length > 19:
      displayErrorMsg(
        cardElementId,
        cardErrorMsgId,
        errorMsg,
        'card-number-container'
      );
      return false;
    case cardNumber.length < 19:
      displayErrorMsg(
        cardElementId,
        cardErrorMsgId,
        errorMsg,
        'card-number-container'
      );
      return false;
    default:
      removeErrorMsg(cardElementId, cardErrorMsgId);
      return true;
  }
};

const validateCardCvv = (cardCvv) => {
  const errorMsg = 'Please enter valid card CVV';
  const cardCvvElementId = 'cardCvv';
  const cardCvvErrorMsgId = 'card-cvv-error';

  if (!cardCvv || cardCvv.length < 3 || cardCvv.length > 3) {
    displayErrorMsg(
      cardCvvElementId,
      cardCvvErrorMsgId,
      errorMsg,
      'card-cvv-container'
    );
    return false;
  } else {
    removeErrorMsg(cardCvvElementId, cardCvvErrorMsgId);
    return true;
  }
};

export const validateInputs = () => {
  const formData = new FormData(form);
  const fullName = formData.get('fullName');
  const cardNumber = formData.get('cardNumber');
  const cardCvv = formData.get('cardCvv');

  const isNameValid = validateName(fullName);
  const isCardNumValid = validateCardNumber(cardNumber);
  const isCardCvvValid = validateCardCvv(cardCvv);

  if (isNameValid && isCardNumValid && isCardCvvValid) {
    form.reset();
    document.getElementById('modal').style.display = 'none';
    return true;
  }
};
