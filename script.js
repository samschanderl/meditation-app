const meditationBtn = document.querySelector('.meditation-button');
const timerCircle = document.querySelector('.timer-circle');
const meditationText = document.querySelector('.meditation-text');
const button = document.querySelector('.button');

let meditationOn = false

button.addEventListener('click', (e) => {
    e.preventDefault();

    if (!meditationOn) {
        meditationOn = true
        changeText()
        timerCircle.classList.add('rotate');
        meditationBtn.classList.add('pulsate')
        button.textContent = 'Stop Meditation'
    }
    else if (meditationOn) {
        meditationOn = false
        timerCircle.classList.remove('rotate');
        meditationBtn.classList.remove('pulsate')
        button.textContent = 'Start Meditation'
    }

})

const changeText = () => {
    setTimeout(() => {
        meditationText.innerHTML = '"Hold..."'
    }, 3000);
    setTimeout(() => {
        meditationText.innerHTML = '"Breathe Out..."'
    }, 6000);
    setTimeout(() => {
        meditationText.innerHTML = '"Breathe in..."'
    }, 9000)
}