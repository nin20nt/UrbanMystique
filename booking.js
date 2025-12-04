// Booking page functionality
let selectedPackage = null;
let packagePrice = 0;

const storyOptions = {
    single: ['The Vanished Vase', 'Secrets of the Silent Gallery', 'The Midnight Courier'],
    double: ['The Vanished Vase', 'Secrets of the Silent Gallery', 'The Midnight Courier'],
    complete: ['All 3 Stories Included']
};

function selectPackage(packageType, price) {
    selectedPackage = packageType;
    packagePrice = price;
    
    // Show the booking form
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.style.display = 'block';
    
    // Update package summary
    updatePackageSummary();
    
    // Generate story selection based on package
    generateStorySelection(packageType);
    
    // Scroll to form
    bookingForm.scrollIntoView({ behavior: 'smooth' });
    
    // Update total cost
    updateTotalCost();
}

function updatePackageSummary() {
    const summary = document.getElementById('packageSummary');
    const packageNames = {
        single: 'Single Story Package',
        double: 'Double Feature Package',
        complete: 'Complete Collection Package'
    };
    
    summary.innerHTML = `
        <h3 style="color: #ffff00; margin-bottom: 0.5rem;">${packageNames[selectedPackage]}</h3>
        <p style="font-size: 1.2rem; margin: 0;">$${packagePrice} per person</p>
    `;
}

function generateStorySelection(packageType) {
    const storySelection = document.getElementById('storySelection');
    const stories = storyOptions[packageType];
    
    if (packageType === 'complete') {
        storySelection.innerHTML = `
            <label>Stories Included</label>
            <div style="color: #ffffff; padding: 1rem; background-color: #2a2a1a; border-radius: 5px;">
                <p style="margin: 0;">✓ The Vanished Vase</p>
                <p style="margin: 0.5rem 0 0 0;">✓ Secrets of the Silent Gallery</p>
                <p style="margin: 0.5rem 0 0 0;">✓ The Midnight Courier</p>
            </div>
        `;
    } else {
        const numStories = packageType === 'single' ? 1 : 2;
        storySelection.innerHTML = `
            <label>Select Your ${numStories === 1 ? 'Story' : 'Stories'} *</label>
            ${numStories === 1 ? `
                <select id="story1" required>
                    <option value="">Choose a story...</option>
                    ${stories.map(story => `<option value="${story}">${story}</option>`).join('')}
                </select>
            ` : `
                <select id="story1" required style="margin-bottom: 1rem;">
                    <option value="">Choose first story...</option>
                    ${stories.map(story => `<option value="${story}">${story}</option>`).join('')}
                </select>
                <select id="story2" required>
                    <option value="">Choose second story...</option>
                    ${stories.map(story => `<option value="${story}">${story}</option>`).join('')}
                </select>
            `}
        `;
    }
}

function updateTotalCost() {
    const numPeople = document.getElementById('numPeople').value || 2;
    const total = packagePrice * numPeople;
    
    const totalSection = document.getElementById('totalCost');
    totalSection.innerHTML = `
        <h3 style="color: #ffff00; font-size: 1.5rem; margin-bottom: 0.5rem;">Total Cost</h3>
        <p style="color: #ffffff; font-size: 2rem; font-weight: bold; margin: 0;">$${total}</p>
        <p style="color: #cccccc; font-size: 1rem; margin: 0.5rem 0 0 0;">${numPeople} ${numPeople === 1 ? 'person' : 'people'} × $${packagePrice}</p>
    `;
}

// Update total when number of people changes
document.addEventListener('DOMContentLoaded', function() {
    const numPeopleInput = document.getElementById('numPeople');
    if (numPeopleInput) {
        numPeopleInput.addEventListener('input', updateTotalCost);
    }
    
    // Handle form submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                package: selectedPackage,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                numPeople: document.getElementById('numPeople').value,
                preferredDate: document.getElementById('preferredDate').value,
                specialRequests: document.getElementById('specialRequests').value
            };
            
            // Get selected stories
            if (selectedPackage === 'single') {
                formData.story1 = document.getElementById('story1').value;
            } else if (selectedPackage === 'double') {
                formData.story1 = document.getElementById('story1').value;
                formData.story2 = document.getElementById('story2').value;
                
                // Check if same story selected twice
                if (formData.story1 === formData.story2) {
                    alert('Please select two different stories.');
                    return;
                }
            }
            
            console.log('Booking submitted:', formData);
            alert('Thank you for your booking! We will contact you shortly to confirm your adventure.');
            
            // In a real application, this would send data to a server
            // For now, we'll just reset the form
            bookingForm.reset();
            document.getElementById('bookingForm').style.display = 'none';
        });
    }
});