// Timer Application - Optimized version without jQuery and moment.js

document.addEventListener('DOMContentLoaded', function() {
    // DOM Element references
    const secondsDisplay = document.getElementById('id_seconds');
    const minutesDisplay = document.getElementById('id_minutes');
    const hoursDisplay = document.getElementById('id_hours');
    const alarmAudio = document.getElementById('id_alarm');
    const allUnitValues = document.querySelectorAll('.unit_value');
    const allUnitNames = document.querySelectorAll('.unit_name');
    const nonSepValues = Array.from(allUnitValues).filter(el => !el.closest('.sep'));

    const resetButton = document.getElementById('resetButton');
    const setButton = document.getElementById('setButton');
    const startStopButton = document.getElementById('startStopButton');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');

    // State variables
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let totalDurationMs = 0; // Total duration in milliseconds
    let remainingMs = 0; // Remaining time in milliseconds
    let pausedMs = 0; // Time paused (for pause/resume)
    let animationFrameId = null;
    let startTimestamp = null;
    let isRunning = false;
    let lastUpdateTime = 0; // For throttling updates to ~50ms

    /**
     * Format a number to two-digit string
     */
    function formatNumber(num) {
        if (isNaN(num) || num < 0) return '00';
        return num < 10 ? '0' + num : String(num);
    }

    /**
     * Reset the timer display
     */
    function resetTimer() {
        startStopButton.value = 'START';
        startStopButton.disabled = false;
        allUnitValues.forEach(el => el.style.color = 'black');

        hours = parseInt(hoursInput.value) || 0;
        minutes = parseInt(minutesInput.value) || 0;
        seconds = parseInt(secondsInput.value) || 0;

        // Calculate total duration in milliseconds
        totalDurationMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
        remainingMs = totalDurationMs;
        pausedMs = 0;

        updateDisplay();
    }

    /**
     * Update the display with current time
     */
    function updateDisplay() {
        const totalSeconds = Math.floor(remainingMs / 1000);
        const h = Math.floor(totalSeconds / 3600) % 24;
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        hoursDisplay.textContent = '\u00A0' + formatNumber(h) + '\u00A0';
        minutesDisplay.textContent = '\u00A0' + formatNumber(m) + '\u00A0';
        secondsDisplay.textContent = '\u00A0' + formatNumber(s) + '\u00A0';
    }

    /**
     * Timer tick using requestAnimationFrame for smooth performance
     * Updates throttled to ~50ms intervals to match original behavior
     */
    function timerTick(timestamp) {
        if (!startTimestamp) return;

        // Throttle updates to ~50ms (20 updates per second)
        if (timestamp - lastUpdateTime < 50) {
            animationFrameId = requestAnimationFrame(timerTick);
            return;
        }
        lastUpdateTime = timestamp;

        const elapsed = Date.now() - startTimestamp;
        remainingMs = totalDurationMs - elapsed - pausedMs;

        if (remainingMs <= 0) {
            // Timer finished
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            remainingMs = 0;
            pausedMs = 0;
            updateDisplay();

            // Play alarm sound
            alarmAudio.src = '/notification.wav'; // Changed to cross-platform path
            try {
                alarmAudio.play().catch(err => console.log('Audio play failed:', err));
            } catch (e) {
                console.log('Could not play alarm:', e);
            }

            // Update UI
            allUnitValues.forEach(el => el.style.color = 'red');
            resetButton.disabled = false;
            setButton.disabled = false;
            startStopButton.disabled = true;
            hoursInput.disabled = false;
            minutesInput.disabled = false;
            secondsInput.disabled = false;

            // Reset for next use
            remainingMs = totalDurationMs;
            pausedMs = 0;
        } else {
            updateDisplay();
            animationFrameId = requestAnimationFrame(timerTick);
        }
    }

    /**
     * Start or stop the timer
     */
    function toggleTimer() {
        if (startStopButton.value === 'START') {
            // Start the timer
            startTimestamp = Date.now();
            lastUpdateTime = performance.now();
            isRunning = true;

            resetButton.disabled = false;
            setButton.disabled = true;
            hoursInput.disabled = true;
            minutesInput.disabled = true;
            secondsInput.disabled = true;
            startStopButton.value = 'STOP';
            startStopButton.disabled = false;

            animationFrameId = requestAnimationFrame(timerTick);
        } else {
            // Stop/pause the timer
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            isRunning = false;

            pausedMs = totalDurationMs - remainingMs;

            resetButton.disabled = false;
            setButton.disabled = false;
            hoursInput.disabled = false;
            minutesInput.disabled = false;
            secondsInput.disabled = false;
            startStopButton.value = 'START';
            startStopButton.disabled = false;
        }
    }

    /**
     * Reset the timer
     */
    function handleReset() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        isRunning = false;
        startTimestamp = null;
        resetTimer();

        resetButton.disabled = true;
        setButton.disabled = false;
        hoursInput.disabled = false;
        minutesInput.disabled = false;
        secondsInput.disabled = false;
    }

    /**
     * Set timer from input values
     */
    function handleSet() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        isRunning = false;
        startTimestamp = null;
        resetTimer();
    }

    /**
     * Handle keyboard shortcuts
     * Space: Start/Stop timer
     * R: Reset timer
     */
    function handleKeyboard(event) {
        // Don't trigger shortcuts when typing in input fields
        if (event.target.tagName === 'INPUT' && event.target.type === 'number') {
            return;
        }

        switch(event.code) {
            case 'Space':
                event.preventDefault();
                if (!startStopButton.disabled) {
                    toggleTimer();
                }
                break;
            case 'KeyR':
                event.preventDefault();
                if (!resetButton.disabled) {
                    handleReset();
                }
                break;
        }
    }

    // Event listeners
    setButton.addEventListener('click', handleSet);
    resetButton.addEventListener('click', handleReset);
    startStopButton.addEventListener('click', toggleTimer);
    document.addEventListener('keydown', handleKeyboard);

    // Handle window resize for responsive design
    window.addEventListener('resize', function() {
        // CSS clamp() handles responsive sizing automatically
        // No JS needed for font size adjustment
    });

    // Initialize
    resetTimer();
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    resetButton.disabled = true;
    setButton.disabled = false;
});
