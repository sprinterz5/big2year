const Confettiful = function(el) {
  this.el = el;
  this.containerEl = null;
  
  this.confettiFrequency = 3;
  this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E','#EFFF1D'];
  this.confettiAnimations = ['slow', 'medium', 'fast'];
  
  this._setupElements();
  this._renderConfetti();
};

Confettiful.prototype._setupElements = function() {
  const containerEl = document.createElement('div');
  const elPosition = this.el.style.position;
  
  if (elPosition !== 'relative' || elPosition !== 'absolute') {
    this.el.style.position = 'relative';
  }
  
  containerEl.classList.add('confetti-container');
  
  this.el.appendChild(containerEl);
  
  this.containerEl = containerEl;
};

Confettiful.prototype._renderConfetti = function() {
  this.confettiInterval = setInterval(() => {
    const confettiEl = document.createElement('div');
    const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
    const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
    const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
    const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];
    
    confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
    confettiEl.style.left = confettiLeft;
    confettiEl.style.width = confettiSize;
    confettiEl.style.height = confettiSize;
    confettiEl.style.backgroundColor = confettiBackground;
    
    confettiEl.removeTimeout = setTimeout(function() {
      confettiEl.parentNode.removeChild(confettiEl);
    }, 3000);
    
    this.containerEl.appendChild(confettiEl);
  }, 25);
};

window.confettiful = new Confettiful(document.querySelector('.js-container'));

// Устанавливаем дату начала отношений — 31 июля 2023 года
const startDate = new Date("July 31, 2023 00:00:00").getTime();

// Функция для расчета прошедших дней с учетом високосных годов
const calculateLeapYears = (startDate, endDate) => {
  let leapYears = 0;
  for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
    // Проверка на високосный год
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
      leapYears++;
    }
  }
  return leapYears;
};

// Создаем элементы для отображения таймера
const timerElement = document.createElement("div");
timerElement.classList.add("timer");
document.body.appendChild(timerElement);

// Создаем элемент для поздравления
const congratulationsMessage = document.createElement("div");
congratulationsMessage.classList.add("congratulations-message");
document.body.appendChild(congratulationsMessage);

// Функция для обновления таймера
const updateTimer = () => {
  let now = new Date().getTime();
  let distance = now - startDate; // Вычисляем, сколько времени прошло с начала отношений

  // Если прошло меньше двух лет
  if (distance < 2 * 365 * 24 * 60 * 60 * 1000 + calculateLeapYears(new Date("July 31, 2023"), new Date("July 31, 2025")) * 86400000) {
    // Расчет оставшихся дней с учетом високосного года
    let daysLeft = Math.floor((2 * 365 * 24 * 60 * 60 * 1000 + calculateLeapYears(new Date("July 31, 2023"), new Date("July 31, 2025")) * 86400000 - distance) / (1000 * 60 * 60 * 24));
    let hoursLeft = Math.floor((2 * 365 * 24 * 60 * 60 * 1000 + calculateLeapYears(new Date("July 31, 2023"), new Date("July 31, 2025")) * 86400000 - distance) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    let minutesLeft = Math.floor((2 * 365 * 24 * 60 * 60 * 1000 + calculateLeapYears(new Date("July 31, 2023"), new Date("July 31, 2025")) * 86400000 - distance) % (1000 * 60 * 60) / (1000 * 60));
    let secondsLeft = Math.floor((2 * 365 * 24 * 60 * 60 * 1000 + calculateLeapYears(new Date("July 31, 2023"), new Date("July 31, 2025")) * 86400000 - distance) % (1000 * 60) / 1000);

    // Показать время до 2 лет
    timerElement.innerHTML = `До 2-х лет!!!!1!!111! ${daysLeft}д ${hoursLeft}ч ${minutesLeft}м ${secondsLeft}с.`;
    
  } else {
    // Когда прошло 2 года
    let timePassed = now - (startDate + 2 * 365 * 24 * 60 * 60 * 1000 + calculateLeapYears(new Date("July 31, 2023"), new Date("July 31, 2025")) * 86400000); // Начинаем отсчет с двух лет

    let daysPassed = Math.floor(timePassed / (1000 * 60 * 60 * 24));
    let hoursPassed = Math.floor((timePassed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutesPassed = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));
    let secondsPassed = Math.floor((timePassed % (1000 * 60)) / 1000);

    // Показать время прошедшее с двух лет
    timerElement.innerHTML = `Прошло с 2-х лет: ${daysPassed}д ${hoursPassed}ч ${minutesPassed}м ${secondsPassed}с.`;

    // Показать поздравление
    if (!congratulationsMessage.innerHTML) {
      congratulationsMessage.innerHTML = "🎉 Happy 2 years ❤️";
      congratulationsMessage.style.display = 'block'; // Показать поздравление
      congratulationsMessage.classList.add('show-message'); // Анимация
    }
  }
};

// Обновлять таймер каждую секунду
setInterval(updateTimer, 1000);
