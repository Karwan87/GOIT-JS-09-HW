import flatpickr from 'flatpickr';
export function convertMsToTime(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  return {
    days: days,
    hours: hours < 10 ? `0${hours}` : hours,
    minutes: minutes < 10 ? `0${minutes}` : minutes,
    seconds: seconds < 10 ? `0${seconds}` : seconds,
  };
}

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');

const countdownContainer = document.querySelector('#countdown');
let intervalId;

function calculateRemainingTime(selectedDate) {
  const currentDate = new Date();
  const selectedTime = selectedDate.getTime();
  const remainingTime = selectedTime - currentDate.getTime();
  return remainingTime;
}

function setTimerValues(timeObj) {
  const days = document.querySelector('[data-days]');
  const hours = document.querySelector('[data-hours]');
  const minutes = document.querySelector('[data-minutes]');
  const seconds = document.querySelector('[data-seconds]');

  days.textContent = timeObj.days;
  hours.textContent = timeObj.hours;
  minutes.textContent = timeObj.minutes;
  seconds.textContent = timeObj.seconds;
}

function countdown(selectedDate) {
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    const remainingTime = calculateRemainingTime(selectedDate);

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      countdownContainer.textContent = 'Time is up!';
      startButton.disabled = false;
      return;
    }

    const timeObj = convertMsToTime(remainingTime);
    setTimerValues(timeObj);
  }, 1000);
}

const flatpickrInstance = flatpickr('#datetime-picker', {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
});

startButton.addEventListener('click', () => {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const inputDate = new Date(dateTimePicker.value);

  if (!inputDate) {
    window.alert('Please choose a date');
    return;
  }

  const currentTime = new Date().getTime();
  const selectedTime = inputDate.getTime();

  if (selectedTime < currentTime) {
    window.alert('Please choose a date in the future');
    return;
  }

  startButton.disabled = true;
  countdown(inputDate);
});
