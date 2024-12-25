const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const timerSound = document.getElementById('timer-sound');

let startTime;
let isRunning = false;
let isWorkInterval = true;
let remainingTime;

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - (remainingTime ? remainingTime * 60 * 1000 : 0); 
    isRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  isWorkInterval = true;
  remainingTime = workTimeInput.value * 60; 
  updateDisplay();
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  remainingTime = isWorkInterval
    ? workTimeInput.value * 60 - Math.floor(elapsedTime / 1000)
    : breakTimeInput.value * 60 - Math.floor(elapsedTime / 1000);

  if (remainingTime <= 0) {
    timerSound.play();
    switchInterval();
  }

  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  let seconds = remainingTime % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function switchInterval() {
  isWorkInterval = !isWorkInterval;
  startTime = Date.now(); 
  remainingTime = isWorkInterval
    ? workTimeInput.value * 60
    : breakTimeInput.value * 60;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize timer
resetTimer();