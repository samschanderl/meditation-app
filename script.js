const meditationBtn = document.querySelector('.meditation-button');
const timerCircle = document.querySelector('.timer-circle');
const meditationText = document.querySelector('.meditation-text');
const startBtn = document.querySelector('#startBtn');
const oceanBtn = document.querySelector('#oceanBtn');
const forestBtn = document.querySelector('#forestBtn');
const soundBtns = document.getElementsByClassName('soundBtn');

let meditationOn = false;
let countingDown = false;

// define interval and timeouts to stop them later correctly
let interval;
let holdTime;
let breatheOutTime;

// audio intervals
let fadeOut;
let fadeIn;

// var audio = new Audio();
// console.log(audio)
const oceanSounds = '/files/ocean-audio.mp3';
const forestSounds = '/files/forest-audio.mp3';
const rainSounds = '/files/rain-audio.mp3'
let audio = new Audio(oceanSounds);
let selectedAudio = oceanSounds;
let audioPlaying = false
console.log(audio)

// listen to sound buttons to select audio
for (var btn of soundBtns) {
    btn.addEventListener('click', (e) => {
        let previewTime = 3000
        audioPlaying === true;
        console.log(e.target.parentElement.children)
        startBtn.disabled = true;
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
                toggleAudio(1, false)
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
                toggleAudio(1, false)
            }, previewTime)
            // change the styles of the audio buttons
            removeButtonStyles(e)
            addButtonStyle(e)
        }
        else if (e.target.id === 'rainBtn') {
            console.log('rain')
            audio.src = selectedAudio = rainSounds;
            // fade audio in and out
            toggleAudio(1.5)
            setTimeout(() => {
                toggleAudio(1.5, false)
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
        countDown(countDownTimer);
        setTimeout(() => {
            audio.src = '';
            audio.src = selectedAudio
            console.log('meditaton: On');
            // playAudio();
            toggleAudio(3, true);
            startAnimation();
            changeText(meditationOn);
            interval = setInterval(changeText, 9000, true);
            countingDown = false;
        }, countDownTimer * 1000);
        ;
    }
    else if (!meditationOn){
        // if (countingDown) {
        //     audio.src = ''
        // }
        clearInterval(interval)
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
    timerCircle.classList.add('rotate');
    meditationBtn.classList.add('pulsate')
    startBtn.textContent = 'Stop Meditation';
}

const stopAnimation = () => {
    timerCircle.classList.remove('rotate');
    meditationBtn.classList.remove('pulsate')
    startBtn.textContent = 'Start Meditation';
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
            if (count === increments) {
                clearInterval(fadeIn)
            }
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
                clearInterval(fadeOut)
                audio.src = oceanSounds
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