import { Clock } from "./clock.js";
const clock = new Clock();


const breakSlider = document.getElementById("break-slider");
const workSlider = document.getElementById("work-slider");
const breakText = document.getElementById("break-slider-value");
const workText = document.getElementById("work-slider-value");
const timeText = document.getElementById("clock");

breakText.textContent = `${breakSlider.value} minutes`;
workText.textContent = `${workSlider.value} minutes`;

breakSlider.oninput = function() {
    breakText.textContent = `${this.value} minutes`;
}

workSlider.oninput = function() {
    workText.textContent = `${this.value} minutes`;
    clock.setSeconds(workSlider.value * 60);
    updateTimeText();
}

function startTimer() {
    const label = document.getElementById("clock-label");
    label.textContent = 'WORK';
    
    let interval = setInterval(() => {

        clock.tick();
        updateTimeText();

        if(clock.getSeconds() === 0) {
            clearInterval(interval);
        }

    }, 1000);

    document.getElementById('reset-timer').addEventListener('click', (e) => {
        clearInterval(interval);
    });
    document.getElementById('pause-timer').addEventListener('click', (e) => {
        clearInterval(interval);
    });

    
}

function updateTimeText() {
    const time = clock.getTimeRemaining();
    const seconds = time.seconds;
    const minutes = time.minutes;

    if(minutes >= 10) {
        timeText.textContent = `${minutes}:`;
    } else {
        timeText.textContent = `0${minutes}:`;
    }
    
    if(seconds >= 10) {
        timeText.textContent += `${seconds}`;
    } else {
        timeText.textContent += `0${seconds}`;
    }

    if(minutes === 0 && seconds == 0) {
        timeText.textContent = "00:00";
    }
    
}


window.onload = function () {
    document.getElementById('short-timer').addEventListener('click', (e) => {
        workText.textContent = '25 minutes';
        workSlider.value = 25;
        breakText.textContent = '5 minutes';
        breakSlider.value = 5;
        clock.setSeconds(workSlider.value * 60);
        updateTimeText();
    });
    document.getElementById('long-timer').addEventListener('click', (e) => {
        workText.textContent = '50 minutes';
        workSlider.value = 50;
        breakText.textContent = '10 minutes';
        breakSlider.value = 10;
        clock.setSeconds(workSlider.value * 60);
        updateTimeText();
    });
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('reset-timer').addEventListener('click', (e) => {
        clock.setSeconds(workSlider.value * 60);
        updateTimeText();
    });

    clock.setSeconds(workSlider.value * 60);
    updateTimeText();
}





