function compute() {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    let frameRate = parseInt(document.getElementById('framerate').value);
    let startFrame = document.getElementById('startobj').value;
    let endFrame = document.getElementById('endobj').value;
    if (typeof (startFrame) === 'undefined' || endFrame === 'undefined' || framerate === 'undefined') {
        return
    };
    let frames = (endFrame - startFrame) * frameRate;
    seconds = Math.floor(frames / frameRate);
    frames = frames % frameRate;
    milliseconds = Math.round(frames / frameRate * 1000);
    if (milliseconds < 10) {
        milliseconds = '00' + milliseconds;
    } else if (milliseconds < 100) {
        milliseconds = '0' + milliseconds;
    }
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
    }
    if (minutes >= 60) {
        hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
    }
    let finalTime = hours.toString() + 'h ' + minutes.toString() + 'm ' + seconds.toString() + 's ' + milliseconds.toString() + 'ms ';
    let modMessage = `Mod Message: The start frame is ${parseFloat(startFrame).toFixed(3)} and the end frame is ${parseFloat(endFrame).toFixed(3)} at ${frameRate} fps. The time is ${finalTime}.`;
    document.getElementById('time').value = finalTime;
    document.getElementById('modMessage').disabled = false;
    document.getElementById('modMessage').innerText = modMessage
    document.getElementById("modMessageButton").disabled = false;
}

function copyModMessage() {
    const textArea = document.getElementById('modMessage');
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    alert(`You copied the Mod Message.`)
}

const validateFPS = (event) => {
    if (event.target.value === '' ||parseInt(event.target.value) <= 0 || isNaN(parseInt(event.target.value))) {
        document.getElementById('framerate').setCustomValidity('Enter a valid Framerate!');
        document.getElementById('framerate').reportValidity();
        document.getElementById('startobj').disabled = true;
        document.getElementById('endobj').disabled = true;
        document.getElementById('computeButton').disabled = true;
    } else {
        document.getElementById('startobj').disabled = false;
        document.getElementById('endobj').disabled = false;
        document.getElementById('computeButton').disabled = false;
    }
}

const parseForTime = (event) => {
    let frameFromInputText = (JSON.parse(event.target.value)).lct;
    if (typeof frameFromInputText !== 'undefined') {
        let frameRate = parseInt(document.getElementById('framerate').value);
        let frameFromObj = (time, fps) => Math.floor(time * fps) / fps;
        let finalFrame = frameFromObj(frameFromInputText, frameRate);
        document.getElementById(event.target.id).value = `${finalFrame}`;
    }
}