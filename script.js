const meditationBtn = document.querySelector('.meditation-button');
const timerCircle = document.querySelector('.timer-circle');
const meditationText = document.querySelector('.meditation-text');
const startBtn = document.querySelector('#startBtn');
const oceanBtn = document.querySelector('#oceanBtn');
const forestBtn = document.querySelector('#forestBtn');
const soundBtns = document.getElementsByClassName('soundBtn');
const rangeSlider = document.getElementById('range-slider');
const rangeCurrent = document.getElementById('range-current');

let meditationOn = false;
let countingDown = false;
let duration;

// define interval and timeouts to stop them later correctly
let interval;
let holdTime;
let breatheOutTime;

// audio intervals
let fadeOut;
let fadeIn;


const oceanSounds = '/files/ocean-audio.mp3';
const forestSounds = '/files/forest-audio.mp3';
const rainSounds = '/files/rain-audio.mp3'
let audio = new Audio(oceanSounds);
let selectedAudio = oceanSounds;
let audioPlaying = false
console.log(audio)

// set the slider and duration for one round
rangeCurrent.innerHTML = `${rangeSlider.value} seconds`;
duration = rangeSlider.value

rangeSlider.oninput = function() {
    rangeCurrent.innerHTML = `${this.value} seconds`;
    duration = this.value;
    console.log(duration)
}

// listen to sound buttons to select audio
for (var btn of soundBtns) {
    btn.addEventListener('click', (e) => {
        let previewTime = 3000
        audioPlaying === true;
        console.log(e.target.parentElement.children);
        disableButtons(startBtn);
        setTimeout(() => {
            startBtn.disabled = false;
            startBtn.style.h
        }, previewTime)

        if (e.target.id === 'oceanBtn') {
            console.log('ocean')
            audio.src = selectedAudio = oceanSounds;
            // fade audio in and out
            toggleAudio(1)
            setTimeout(() => {
                toggleAudio(1, false);
                setTimeout(() => {
                    enableButtons(startBtn)
                }, 1000);
            }, previewTime)
            // change the styles of the audio buttons
            removeButtonStyles(e)
            addButtonStyle(e)
        }
        else if (e.target.id === 'forestBtn') {
            console.log('forest')
            audio.src = selectedAudio = forestSounds;
            // fade audio in and out
            toggleAudio(1)
            setTimeout(() => {
                toggleAudio(1, false);
                setTimeout(() => {
                    enableButtons(startBtn)
                }, 1000);
            }, previewTime)
            // change the styles of the audio buttons
            removeButtonStyles(e)
            addButtonStyle(e)
        }
        else if (e.target.id === 'rainBtn') {
            console.log('rain')
            audio.src = selectedAudio = rainSounds;
            audio.currentTime = 60
            // fade audio in and out
            toggleAudio(1.5)
            setTimeout(() => {
                toggleAudio(1.5, false);
                setTimeout(() => {
                    enableButtons(startBtn)
                }, 1500);
            }, previewTime)
            // change the styles of the audio buttons
            removeButtonStyles(e)
            addButtonStyle(e)
        }
        else if (audioPlaying) {
            audioPlaying = !audioPlaying
        }
    })
}

// listen to start button to start meditation
startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    meditationOn = !meditationOn;
    countingDown = !countingDown;
    let countDownTimer = 3
    
    if (meditationOn) {
        disableButtons(...soundBtns);
        countDown(countDownTimer);
        setTimeout(() => {
            audio.src = '';
            audio.src = selectedAudio
            console.log('meditaton: On');
            // playAudio();
            toggleAudio(3, true);
            startAnimation();
            changeText(meditationOn, duration);
            interval = setInterval(() => {
                changeText(meditationOn, duration)
            }, duration * 1000);
            countingDown = false;
        }, countDownTimer * 1000);
        ;
    }
    else if (!meditationOn){
        enableButtons(...soundBtns);
        clearInterval(interval);
        clearTimeout(holdTime);
        clearTimeout(breatheOutTime);
        toggleAudio(3, false);
        stopAnimation();        
        console.log('meditaton: Off')
    }
    }
)

// MOVEMENT ANIMATIONS

const startAnimation = () => {
    timerCircle.style.animation = `rotate ${duration}s linear infinite`;
    meditationBtn.style.animation = `pulsate ${duration}s linear infinite`;
    startBtn.textContent = 'Stop Meditation';
}

const stopAnimation = () => {
    timerCircle.style.animation = ``;
    meditationBtn.style.animation = ``;
    startBtn.textContent = 'Start Meditation';
    meditationText.style.animation = '';
    meditationText.innerHTML = '"Breathe in..."'
}

// BUTTON STYLING

function removeButtonStyles (event) {
    let buttons = event.target.parentElement.children
    console.log(buttons)

    for (var button of buttons) {
        button.classList.remove('button-transparent--active')
    }
}

function addButtonStyle (event) {
    event.target.classList.add('button-transparent--active')
} 

function disableButtons(...buttons) {
    console.log('number of arguments: ', buttons.length)
    for (var button of buttons) {
        button.classList.add('disabled');
        button.disabled = true;
    }
}

function enableButtons(...buttons) {
    console.log('number of arguments: ', buttons.length)
    for (var button of buttons) {
        button.classList.remove('disabled');
        button.disabled = false;
    }
}

// AUDIO CONTROLS

function playAudio() {
    console.log('playing audio...')
    audio.play();
}

function toggleAudio(seconds, play=true) {
    // play audio if true, stop audio if false
    var count = 1;
    var increments = 40;
    var time = seconds/increments * 1000;
    var startVolume = 0;
    var endVolume = 1;

    // starting audio with fade in effect
    if (play) {
        audio.volume = startVolume;
        audio.play();
        
        fadeIn = setInterval(() => {
            // testing audio output
            console.log('playing audio')
            console.log('Time: ', time)
            console.log('Count: ', count)
            console.log('Volume', audio.volume)
            //
            startVolume = startVolume + (1/increments)
            audio.volume =  startVolume 
            count ++;
            // if (audio.volumne >= 0.6) {
            //     clearInterval(fadeIn)
            // }
            if (count === increments) {
                clearInterval(fadeIn)}
        }, time)
        audio.loop = true;
    }
    // stopping audio with fade out effect
    else {
        fadeOut = setInterval(() => {
            console.log('stopping audio')
            console.log('Time: ', time)
            console.log('Count: ', count)
            console.log('Volume', audio.volume)
            endVolume = endVolume - (1/increments)
            audio.volume =  endVolume 
            console.log('Volume: ', audio.volume)
            count ++;
            if (count === increments) {
                clearInterval(fadeOut);
                audio.src = oceanSounds;
            }
        }, time)
    }
} 

function stopAudio(seconds) {
    var count = 1;
    var increments = 20;
    var time = seconds/increments * 1000;
    var volume = 1;
    console.log('stopping audio')

    let fadeOut = setInterval(() => {
        console.log('Time: ', time)
        console.log('Count: ', count)
        console.log('Volume', audio.volume)
        volume = volume - (1/increments)
        audio.volume =  volume 
        console.log('Volume: ', audio.volume)
        count ++;
        if (count === increments) {
            clearInterval(fadeOut)
        }
    }, time)
} 

// ADJUST TEXT

function countDown (seconds) {
    meditationText.innerHTML = '"3..."';
    meditationText.classList.remove('fade-out');
    meditationText.classList.add('fade-in')

    setTimeout(() => {
        meditationText.innerHTML = '"2..."';
        meditationText.classList.remove('fade-out');
        meditationText.classList.add('fade-in')
    }, 1000);
    setTimeout(() => {
        meditationText.innerHTML = '"1..."';
        meditationText.classList.remove('fade-out');
        meditationText.classList.add('fade-in')
    }, 2000)
}

function changeText (val=false, time) {

    if (val === true) {
    // first part
    meditationText.innerHTML = '"Breathe in..."';
    meditationText.style.animation = `fade-in ${time/2}s ease-in`
    
    // seconds part
    holdTime = setTimeout(() => {
        meditationText.innerHTML = '"Hold..."';   
    }, time * 1000 / 3);
    // third part
    breatheOutTime = setTimeout(() => {
        meditationText.innerHTML = '"Breathe Out..."'
        meditationText.style.animation = `fade-out ${time/2}s ease-out`;
    }, time * 1000 / 3 * 2);
    }
    else {
        meditationText.innerHTML = '"Breathe in..."';
    }

}