const errors = {
  authenticationOtp: "",
  ethAddress: "",
  sendAmount: "",
};
const hasErrors = new Set(["authenticationOtp", "ethAddress", "sendAmount"]);

/**
 * Sets/Removes error class to/from the label element wrapping the input field.
 *
 * @param {HTMLElement} labelElement
 * @param {String} errorType
 * @param {String} spanId
 */
const setErrorClass = (labelElement, errorType, spanId) => {
  if (errors[errorType] && !labelElement.className) {
    labelElement.className = "error";
  } else if (!errors[errorType] && labelElement.className) {
    labelElement.className = "";
  }

  document.getElementById(spanId).innerText = errors[errorType];

  if (errors[errorType]) {
    hasErrors.add(errorType);
  } else {
    hasErrors.delete(errorType);
  }

  document.getElementById("submit-button").disabled = hasErrors.size !== 0;
};

/**
 * Validates the ETH Address input field value.
 *
 * @param {Event} e
 */
const validateEthAddress = (e) => {
  const ethAddress = e.target.value;

  if (!ethAddress) {
    errors.ethAddress = "ETH Address should not be empty";
  } else if (!/^(0x)?[0-9a-fA-F]{40}$/.test(ethAddress)) {
    errors.ethAddress = "Please enter a valid ETH Address";
  } else {
    errors.ethAddress = "";
  }

  setErrorClass(e.target.parentElement, "ethAddress", "input-address-error");
};

/**
 * Validates the Send Amount input field value.
 *
 * @param {Event} e
 */
const validateSendAmount = (e) => {
  const sendAmount = e.target.value;

  if (!sendAmount) {
    errors.sendAmount = "Amount to be sent should not be empty or 0";
  } else if (parseFloat(sendAmount) === NaN) {
    errors.sendAmount = "Please enter a valid Amount";
  } else {
    errors.sendAmount = "";
  }

  setErrorClass(e.target.parentElement, "sendAmount", "input-amount-error");
};

/**
 * Validates the OTP Authentication input field value.
 *
 * @param {Event} e
 */
const validateOtpAuthentication = (e) => {
  const authenticationOtp = e.target.value;

  if (!authenticationOtp) {
    errors.authenticationOtp = "OTP should not be empty";
  } else if (authenticationOtp.length < 6) {
    errors.authenticationOtp = "Please enter a valid OTP";
  } else {
    errors.authenticationOtp = "";
  }

  setErrorClass(e.target.parentElement, "authenticationOtp", "input-otp-error");
};

/**
 * Shows/Hides loader simulating a HTTP request.
 */
const toggleLoader = () => {
  document.getElementsByClassName("modal")[0].classList.toggle("hidden");
};

const notifySuccess = () => {
  document.getElementsByClassName("notification")[0].classList.toggle("hidden");
};

/**
 * Submit form.
 *
 * @returns {Boolean} false
 */
const submitForm = () => {
  toggleLoader();
  setTimeout(() => {
    toggleLoader();
    notifySuccess();
    setTimeout(notifySuccess, 3000);
  }, 1500);
  return false;
};
