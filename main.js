document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('regionProjectForm');

    if (projectForm) {
        projectForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Gather Customer Info
            const formData = {
                name: e.target.querySelector('input[placeholder="Name"]')?.value,
                email: e.target.querySelector('input[type="email"]')?.value,
                package: typeof selectedPackage !== 'undefined' ? selectedPackage : "Standard",
                notes: e.target.querySelector('textarea')?.value
            };

            // 2. The Database Link (We will put your real link here later)
            console.log("Order Received:", formData);

            // 3. Success Actions
            alert("Order Received! We will contact you shortly.");

            // Unblur the pricing
            const pricing = document.querySelectorAll('.price, .maintenance-tier span');
            pricing.forEach(item => item.style.filter = 'none');

            // Close the popup and reset
            if (typeof closeRegionModal === 'function') closeRegionModal();
            projectForm.reset();
        });
    }
});
