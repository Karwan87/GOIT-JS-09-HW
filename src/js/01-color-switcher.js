function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let intervalId = null;

function startColorSwitcher() {
  startButton.disabled = true;
  stopButton.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorSwitcher() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(intervalId);
}

startButton.addEventListener('click', startColorSwitcher);
stopButton.addEventListener('click', stopColorSwitcher);
