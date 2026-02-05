let breathingInterval;
let isBreathing = false;
let timeoutIds = [];

function updatePhaseIndicator(phase, time) {
    const indicator = document.getElementById('phaseIndicator');
    indicator.textContent = `${phase} - ${time} seconds`;
}

function breatheCycle() {
    const circle = document.getElementById('circle');
    circle.innerText = 'Inhale';
    circle.style.animation = 'inhale 4s forwards';
    updatePhaseIndicator('Inhale', 4);

    timeoutIds.push(setTimeout(() => {
        circle.innerText = 'Hold';
        circle.style.animation = 'hold 7s forwards';
        updatePhaseIndicator('Hold', 7);

        timeoutIds.push(setTimeout(() => {
            circle.innerText = 'Exhale';
            circle.style.animation = 'exhale 8s forwards';
            updatePhaseIndicator('Exhale', 8);
        }, 7000));
    }, 4000));
}

function stopBreathing() {
    const button = document.getElementById('breathButton');
    clearInterval(breathingInterval);
    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutIds = [];
    const circle = document.getElementById('circle');
    circle.style.animation = 'none';
    circle.innerText = 'Inhale';
    button.innerHTML = '<i class="fas fa-play"></i> Start';
    document.getElementById('phaseIndicator').textContent = '';
    isBreathing = false;
}

function toggleBreathing() {
    const button = document.getElementById('breathButton');
    if (isBreathing) {
        stopBreathing();
    } else {
        breatheCycle();
        breathingInterval = setInterval(breatheCycle, 19000);
        button.innerHTML = '<i class="fas fa-stop"></i> Stop';
        isBreathing = true;
    }
}