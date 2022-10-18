const meditationBtn = document.querySelector('.meditation-button');
const timerCircle = document.querySelector('.timer-circle');
const meditationText = document.querySelector('.meditation-text');
const button = document.querySelector('.button');

let meditationOn = false;

//
let interval;
let holdTime;
let breatheOutTime;

// interval = setInterval(test, 1000)
// var audio = new Audio();
// console.log(audio)

// const oceanSounds = ''

button.addEventListener('click', (e) => {
    console.log('clicked')
    e.preventDefault();
    meditationOn = !meditationOn
    
    if (meditationOn) {
        console.log('meditaton: On')
        startAnimation();
        changeText(meditationOn);
        interval = setInterval(changeText, 9000, true)
    }
    else if (!meditationOn){
        stopAnimation();        
        clearInterval(interval)
        clearTimeout(holdTime);
        clearTimeout(breatheOutTime);
        console.log('meditaton: Off')
    } 
})

const startAnimation = () => {
    timerCircle.classList.add('rotate');
    meditationBtn.classList.add('pulsate')
    button.textContent = 'Stop Meditation';
}

const stopAnimation = () => {
    timerCircle.classList.remove('rotate');
    meditationBtn.classList.remove('pulsate')
    button.textContent = 'Start Meditation';
    meditationText.innerHTML = '"Breathe in..."'
}

function changeText (val=false) {

    if (val === true) {
    // first 3 seconds
    meditationText.innerHTML = '"Breathe in..."'
    meditationText.classList.remove('fade-out');
    meditationText.classList.add('fade-in')
    // seconds 3 to 6
    holdTime = setTimeout(() => {
        meditationText.classList.remove('fade-in');
        meditationText.innerHTML = '"Hold..."';
        
    }, 3000);
    // seconds 6 to 9
    breatheOutTime = setTimeout(() => {
        meditationText.innerHTML = '"Breathe Out..."'
        meditationText.classList.remove('fade-in');
        meditationText.classList.add('fade-out');
    }, 6000);
    }
    else {
        meditationText.innerHTML = '"Breathe in..."';
    }

}