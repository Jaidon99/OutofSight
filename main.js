document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('regionProjectForm');

    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault(); // This stops the page from refreshing

            // 1. Collect the data from your divs
            const formData = {
                name: e.target.querySelector('input[type="text"]:nth-of-type(1)').value,
                surname: e.target.querySelector('input[type="text"]:nth-of-type(2)').value,
                email: e.target.querySelector('input[type="email"]').value,
                package: document.getElementById('packageSelect').value,
                notes: e.target.querySelector('textarea').value
            };

            // 2. UNBLUR the prices and maintenance numbers
            // This looks for all elements with the class "price" and the maintenance spans
            const blurredElements = document.querySelectorAll('.price, .maintenance-tier span');
            
            blurredElements.forEach(el => {
                el.style.filter = 'none'; // Removes the blur(10px)
            });

            // 3. Success Feedback
            alert("Success! Your request has been received and prices are unlocked.");

            // 4. Close the modal (Using the function already in your HTML)
            if (typeof closeRegionModal === 'function') {
                closeRegionModal();
            }

            // Optional: Reset form for next time
            projectForm.reset();
            
            console.log("Data ready for database:", formData);
        });
    }
});
