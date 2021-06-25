// Global bindings
const inputs = document.querySelectorAll('input[type="text"]');
const form = document.querySelector('.validation-form');
const monthInput = document.querySelector('input[name="MM"]');
const dayInput = document.querySelector('input[name="DD"]');
const yearInput = document.querySelector('input[name="YYYY"]');
let month, day, year;

/**
 * Prevent letters from being entered in input fields
 * @param {object} e
 */
function replaceLettersWithNumbers(e) {
  return (e.target.value = e.target.value
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*)\./g, '$1'));
}

/**
 * @param {object} input
 * @param {string} color
 * @returns
 */
function changeInputBorderColor(input, color) {
  return (input.style.border = `1px solid ${color}`);
}

/**
 * Validate month, day and year as user types in fields
 */
function validateMonthInRealTime() {
  monthInput.value.length === 2 &&
  monthInput.value >= 1 &&
  monthInput.value <= 12
    ? changeInputBorderColor(monthInput, 'green')
    : changeInputBorderColor(monthInput, 'red');
}
function validateDayInRealTime() {
  dayInput.value.length === 2 && dayInput.value >= 1 && dayInput.value <= 31
    ? changeInputBorderColor(dayInput, 'green')
    : changeInputBorderColor(dayInput, 'red');
}
function validateYearInRealTime() {
  yearInput.value.length === 4 &&
  yearInput.value >= 1800 &&
  yearInput.value < new Date().getFullYear()
    ? changeInputBorderColor(yearInput, 'green')
    : changeInputBorderColor(yearInput, 'red');
}

/**
 * year, month, day
 * @param {object} dob
 * @returns user age
 */
function calculateAge(dob) {
  const difference = Date.now() - dob.getTime();
  const age = new Date(difference);

  return Math.abs(age.getUTCFullYear() - 1970);
}

/**
 * When user submits, evaluate whether or not they are able to enter site
 * @returns true or false whether or not user is over 21
 */
function determineAgeOnSubmit() {
  // users birthday data
  const monthValue = +monthInput.value;
  const dayValue = +dayInput.value;
  const yearValue = +yearInput.value;
  const userAge = calculateAge(new Date(yearValue, monthValue, dayValue));
  let userIsOver21;

  if (userAge >= 21) {
    userIsOver21 = true;
  } else {
    userIsOver21 = false;
  }

  return userIsOver21;
}

/**
 * Catches all errors before submitting
 * @param {*} e
 */
function catchErrors(e) {
  if (
    monthInput.value < 1 ||
    monthInput.value > 12 ||
    dayInput.value < 1 ||
    monthInput.value > 31 ||
    yearInput.value < 1 ||
    +yearInput.value > new Date().getFullYear() ||
    +yearInput.value < 1890
  ) {
    e.preventDefault();
    displayValidationTip("Something doesn't look right...");
  }

  if (!determineAgeOnSubmit()) {
    e.preventDefault();
    displayValidationTip('Sorry, you must be at least 21 to enter 🍼');
  }
}

/**
 * Change validation instruction if user isn't of age
 */
function displayValidationTip(tip) {
  const validationInstruction = document.querySelector(
    '.validation-form--instruction'
  );

  validationInstruction.style.color = 'red';
  validationInstruction.textContent = tip;
}

// Event listeners
monthInput.addEventListener('keyup', validateMonthInRealTime);
dayInput.addEventListener('keyup', validateDayInRealTime);
yearInput.addEventListener('keyup', validateYearInRealTime);
form.addEventListener('submit', catchErrors);
inputs.forEach((input) => {
  input.addEventListener('input', replaceLettersWithNumbers);
});
