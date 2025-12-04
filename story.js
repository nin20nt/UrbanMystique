// Story page - unlock sections based on clues page completion
function unlockKey(activityNumber) {
    const keyElement = document.querySelector(`.key[data-key-number="${activityNumber}"]`);
    if (keyElement) {
        keyElement.classList.remove('blurred');
        keyElement.classList.add('unlocked');
    }
}

function unlockStorySections() {
    let allUnlocked = true;
    for (let i = 1; i <= 4; i++) {
        if (localStorage.getItem(`activity_${i}_unlocked`)) {
            unlockKey(i);
        } else {
            allUnlocked = false;
        }
    }
    
    // Show end story button if all activities are unlocked
    if (allUnlocked) {
        showEndStoryButton();
    }
}

function showEndStoryButton() {
    const endButton = document.querySelector('.end-story-button');
    if (endButton) {
        endButton.classList.add('show');
    }
}

function endStory() {
    // Clear all progress from localStorage
    localStorage.removeItem('currentActivity');
    localStorage.removeItem('activity_1_unlocked');
    localStorage.removeItem('activity_2_unlocked');
    localStorage.removeItem('activity_3_unlocked');
    localStorage.removeItem('activity_4_unlocked');
    
    // Redirect to index page
    window.location.href = 'index.html';
}

// Check for unlocked activities when page loads
document.addEventListener('DOMContentLoaded', function() {
    unlockStorySections();
});