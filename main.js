document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('regionProjectForm');

    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents the page from refreshing

            console.log("Button clicked! Form is submitting...");

            // Success Message
            alert("Success! We've received your request.");

            // Unblur the prices on the page
            const blurredItems = document.querySelectorAll('.price, .maintenance-tier span');
            blurredItems.forEach(item => {
                item.style.filter = 'none';
            });

            // Close the popup
            if (typeof closeRegionModal === 'function') {
                closeRegionModal();
            }
        });
    } else {
        console.error("Could not find the form! Check if the ID 'regionProjectForm' is correct.");
    }
});
