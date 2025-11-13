// Timer Application - Optimized version without jQuery and moment.js
// Supports multi-language via i18n.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize i18n system first
    i18n.init();
    // DOM Element references
    const wrapper = document.querySelector('.wrapper');
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
    let isTimerStarted = false; // Track if timer is started for button state

    /**
     * Play dual beep sound using Web Audio API
     * Creates two beeps: 800Hz and 600Hz for alert notification
     */
    function playDualBeep() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // First beep: 800Hz
            const osc1 = audioContext.createOscillator();
            const gain1 = audioContext.createGain();
            osc1.connect(gain1);
            gain1.connect(audioContext.destination);
            osc1.frequency.value = 800;
            osc1.type = 'sine';
            gain1.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            osc1.start(audioContext.currentTime);
            osc1.stop(audioContext.currentTime + 0.3);

            // Second beep: 600Hz (after 0.15s gap)
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            osc2.frequency.value = 600;
            osc2.type = 'sine';
            gain2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.45);
            gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.75);
            osc2.start(audioContext.currentTime + 0.45);
            osc2.stop(audioContext.currentTime + 0.75);
        } catch (e) {
            console.log('Audio playback failed:', e);
        }
    }

    /**
     * Trigger alert animation and sound
     * Shows red pulse + shake effect for 2.8 seconds
     */
    function triggerTimerAlert() {
        // Play the beep sound
        playDualBeep();

        // Add alert class to trigger CSS animation
        wrapper.classList.add('timer-alert');

        // Remove the alert class after animation completes
        setTimeout(function() {
            wrapper.classList.remove('timer-alert');
        }, 2800); // 3 iterations of 0.6s animation + 0.4s safety margin
    }

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
        isTimerStarted = false;
        startStopButton.textContent = i18n.t('startButton');
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

            // Trigger alert animation and sound
            triggerTimerAlert();

            // Update UI - set text color to red
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
        if (!isTimerStarted) {
            // Start the timer
            isTimerStarted = true;
            startTimestamp = Date.now();
            lastUpdateTime = performance.now();
            isRunning = true;

            resetButton.disabled = false;
            setButton.disabled = true;
            hoursInput.disabled = true;
            minutesInput.disabled = true;
            secondsInput.disabled = true;
            startStopButton.textContent = i18n.t('stopButton');
            startStopButton.disabled = false;

            animationFrameId = requestAnimationFrame(timerTick);
        } else {
            // Stop/pause the timer
            isTimerStarted = false;
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
            startStopButton.textContent = i18n.t('startButton');
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

    // Language toggle button
    const langToggleBtn = document.getElementById('langToggleBtn');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', function() {
            const newLang = i18n.getOtherLanguage();
            i18n.setLanguage(newLang);
            // Also update button text
            startStopButton.textContent = isTimerStarted ? i18n.t('stopButton') : i18n.t('startButton');
        });
    }

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
