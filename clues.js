// Clues page password checking with activity tracking
const activityData = {
    1: {
        name: 'Posy Ceramic Studio',
        location: 'A guest visited the studio last night asking odd questions about glaze durability. After they left, the owner found something suspicious on the workshop table.',
        riddle: 'Ceramic pieces must be fired in a kiln. At what temperature does clay typically turn into hard white ceramic - low fire (600-700), mid fire (1000-1100℃) or high fire (1300-1400℃)?',
        passwords: ['high fire']
    },
    2: {
        name: 'Sinki',
        location: 'Staff remember someone nervously buying a handbag yesterday (one big enough to hide something inside). They kept glancing over their shoulder as if afraid of being followed. The next morning, staff found something under the checkout counter.',
        riddle: 'When examining a handbag, what natural feature in the texture tells you it\'s made of real leather rather than fake leather?',
        passwords: ['natural grain texture']
    },
    3: {
        name: 'All Buttons Great & Small',
        location: 'A rushed customer came in yesterday asking for blue fabric patches and looked like they were covered in dust. They dropped something near the register.',
        riddle: 'Buttons can be made from many materials. What material has historically been used for high quality decorative buttons?',
        passwords: ['shell', 'shells']
    },
    4: {
        name: 'Xuan Studio Jewelry',
        location: 'The jeweler remembers someone in a long dark coat fiddling with display cases. Their sleeves snagged on a jewelry stand before they hurried out.',
        riddle: 'Gold purity is measured in karats. How many karats indicate pure gold?',
        passwords: ['24k', '24000', '24 k', '24 000']
    }
};

function showFeedbackModal(message, isCorrect) {
    const modal = document.getElementById('feedbackModal');
    const feedbackMessage = document.getElementById('feedbackMessage');
    
    feedbackMessage.textContent = message;
    modal.classList.add(isCorrect ? 'correct' : 'incorrect');
    modal.style.display = 'flex';
    
    // Auto-close after 2 seconds
    setTimeout(() => {
        closeFeedbackModal();
    }, 2000);
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'none';
    modal.classList.remove('correct', 'incorrect');
}

function showAllCluesUnlocked() {
    const activitySection = document.querySelector('.activity-section');
    const passwordDiv = document.querySelector('.clues-password-input');
    
    activitySection.innerHTML = `
        <h1>🎉 All Clues Unlocked! 🎉</h1>
        <h2>Congratulations!</h2>
        <p>You've successfully collected all the clues. Check the Story page to piece together the mystery!</p>
    `;
    
    passwordDiv.style.display = 'none';
}

function updateActivityDisplay(activityLevel) {
    const passwordDiv = document.querySelector('.clues-password-input');
    const heading = document.querySelector('.activity-section h1');
    const subheading = document.querySelector('.activity-section h2');
    const clue = document.querySelector('.activity-section p');
    const activity = activityData[activityLevel];
    
    passwordDiv.setAttribute('data-activity', activityLevel);
    heading.textContent = activity.name;
    subheading.textContent = activity.location;
    clue.textContent = activity.riddle;
}

function checkPassword() {
    const passwordInput = document.getElementById('password');
    const passwordDiv = document.querySelector('.clues-password-input');
    const activityLevel = parseInt(passwordDiv.getAttribute('data-activity'));
    const password = passwordInput.value.trim().toLowerCase();
    const activity = activityData[activityLevel];
    const validPasswords = activity.passwords.map(p => p.toLowerCase());

    if (validPasswords.includes(password)) {
        // Correct password
        showFeedbackModal('Correct! Story unlocked!', true);
        passwordInput.value = '';
        
        // Unlock the corresponding section in story page
        localStorage.setItem(`activity_${activityLevel}_unlocked`, 'true');
        
        // Save current activity to localStorage
        const nextActivity = activityLevel + 1;
        if (nextActivity <= 4) {
            localStorage.setItem('currentActivity', nextActivity);
        }
        
        setTimeout(() => {
            // Move to next activity or show completion message
            if (nextActivity <= 4) {
                updateActivityDisplay(nextActivity);
            } else {
                showAllCluesUnlocked();
            }
        }, 2000);
    } else {
        // Wrong password
        showFeedbackModal('Wrong password, please retry.', false);
        passwordInput.value = '';
    }
}

// Add Enter key support and restore saved activity
document.addEventListener('DOMContentLoaded', function() {
    // Restore the current activity from localStorage
    const savedActivity = localStorage.getItem('currentActivity');
    const currentActivity = savedActivity ? parseInt(savedActivity) : 1;
    
    if (currentActivity > 4) {
        showAllCluesUnlocked();
    } else if (currentActivity > 1 && currentActivity <= 4) {
        updateActivityDisplay(currentActivity);
    }
    
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    // Close modal when clicking outside of it
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeFeedbackModal();
            }
        });
    }
});