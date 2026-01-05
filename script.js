// Target date: February 6, 2026 at 12:00 AM (midnight) local time
const targetDate = new Date('2026-02-06T00:00:00');

// Get DOM elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

function updateCountdown() {
    // Get current local time
    const now = new Date();
    
    // Calculate the difference in milliseconds
    const difference = targetDate.getTime() - now.getTime();
    
    // If the target date has passed
    if (difference <= 0) {
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        return;
    }
    
    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update the display with zero-padding
    daysElement.textContent = String(days).padStart(2, '0');
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

// Update immediately
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);

// Title rotation with typing animation
const titles = [
    "Countdown to the greatest day of the year:",
    "Frontal Lobe develops in:",
    "Perennial Backpain starts in:",
    "You become old in:"
];

const titleElement = document.getElementById('title-text');
let currentTitleIndex = 0;
let isAnimating = false;

const typingSpeed = 100; // milliseconds per character
const backspaceSpeed = 60; // milliseconds per character

function backspaceText(callback) {
    if (!titleElement) return;
    
    let currentText = titleElement.textContent;
    let index = currentText.length;
    
    function backspace() {
        if (index > 0) {
            index--;
            titleElement.textContent = currentText.substring(0, index);
            setTimeout(backspace, backspaceSpeed);
        } else {
            if (callback) callback();
        }
    }
    
    backspace();
}

function typeText(text, callback) {
    if (!titleElement) return;
    
    let index = 0;
    
    function type() {
        if (index < text.length) {
            titleElement.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            if (callback) callback();
        }
    }
    
    type();
}

function rotateTitle() {
    if (isAnimating || !titleElement) return;
    
    isAnimating = true;
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
    const nextTitle = titles[currentTitleIndex];
    
    // First backspace current text, then type new text
    backspaceText(() => {
        typeText(nextTitle, () => {
            isAnimating = false;
        });
    });
}

// Rotate title every 5 seconds
setInterval(rotateTitle, 5000);

