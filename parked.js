// imarya.lol/parked.js
(function() {
    async function loadParkedContent() {
        try {
            // Fetch content from the index.html
            const response = await fetch('https://imarya.lol/index.html');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const content = await response.text();
            
            // Replace the entire HTML content
            document.documentElement.innerHTML = content;
            
            // If you want to preserve the script tag that loaded this script,
            // you can use document.body.innerHTML instead:
            // document.body.innerHTML = content;
            
        } catch (error) {
            console.error('Error loading parked content:', error);
            document.body.innerHTML = '<p>Error loading content. Please try again later.</p>';
        }
    }

    // Load content immediately
    loadParkedContent();
})();