// assets/js/postGig.js

document.getElementById('gigForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Collect form values
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const skills = document.getElementById('skills').value.split(',').map(s => s.trim());
    const price = document.getElementById('price').value;

    // Get token from storage
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('gigMessage').textContent = "You must be logged in to post a gig.";
        return;
    }

    // Prepare gig data
    const gigData = { title, description, skills, price };

    try {
        const res = await fetch('http://localhost:5000/api/gigs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(gigData)
        });

        const data = await res.json();

        if (res.ok) {
            document.getElementById('gigMessage').textContent = "Gig posted successfully!";
            document.getElementById('gigForm').reset();
        } else {
            document.getElementById('gigMessage').textContent = data.message || "Failed to post gig.";
        }
    } catch (err) {
        document.getElementById('gigMessage').textContent = "An error occurred.";
    }
});