document.getElementById('regionProjectForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: e.target.querySelector('input[type="text"]:nth-of-type(1)').value,
        surname: e.target.querySelector('input[type="text"]:nth-of-type(2)').value,
        email: e.target.querySelector('input[type="email"]').value,
        package: document.getElementById('packageSelect').value,
        notes: e.target.querySelector('textarea').value
    };

    try {
        // This sends the order to your middleman
        const response = await fetch('YOUR_MIDDLEMAN_URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("Order Sent! You will be notified immediately.");
            // Unblur logic...
            document.querySelectorAll('.price, .maintenance-tier span').forEach(el => el.style.filter = 'none');
            closeRegionModal();
        }
    } catch (err) {
        console.error("Failed to send order.");
    }
});
