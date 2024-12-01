(function() {
    // Guard against multiple executions
    if (window.__parkedScriptLoaded) return;
    window.__parkedScriptLoaded = true;

    // Create a container for our parked content
    const parkedContainer = document.createElement('div');
    parkedContainer.id = 'parked-overlay';
    parkedContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999999;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // Add required styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .parked-animated-gradient {
            background: linear-gradient(
                135deg,
                #0f172a 0%,
                #1e1b4b 25%,
                #312e81 50%,
                #1e1b4b 75%,
                #0f172a 100%
            );
            background-size: 400% 400%;
            animation: parkedGradient 15s ease infinite;
        }
        
        @keyframes parkedGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .parked-content {
            font-family: 'Red Hat Display', sans-serif;
            max-width: 32rem;
            padding: 1rem;
            color: #f3f4f6;
            text-align: center;
            border-radius: 1rem;
            backdrop-filter: blur(16px);
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .parked-button {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            background: linear-gradient(to right, #6366f1, #9333ea);
            color: white;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s;
        }

        .parked-button:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .parked-info {
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(30, 41, 59, 0.5);
            border-radius: 0.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .parked-title {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
            background: linear-gradient(to right, #818cf8, #a855f7);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
    `;

    // Add Google Font
    const fontLink = document.createElement('link');
    fontLink.rel = 'preconnect';
    fontLink.href = 'https://fonts.googleapis.com';
    const fontLink2 = document.createElement('link');
    fontLink2.rel = 'preconnect';
    fontLink2.href = 'https://fonts.gstatic.com';
    fontLink2.crossOrigin = 'anonymous';
    const fontFamily = document.createElement('link');
    fontFamily.rel = 'stylesheet';
    fontFamily.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700&display=swap';

    // Create the content
    parkedContainer.innerHTML = `
        <div class="parked-content">
            <h1 class="parked-title">Domain Parked</h1>
            <div id="parked-main-content">
                <p style="margin-bottom: 1.5rem; color: #e5e7eb;">
                    This project is coming soon or has not been provisioned yet.
                </p>
                <a href="https://github.com/aryasarukkai" class="parked-button">
                    Visit Arya's Github
                </a>
            </div>
            <div class="parked-info">
                <p style="margin-bottom: 0.5rem; color: #e5e7eb;">
                    <span style="font-weight: 500;">Domain:</span>
                    <span id="parked-domain">Loading...</span>
                </p>
                <p style="color: #e5e7eb;">
                    <span style="font-weight: 500;">Server:</span>
                    <span id="parked-server">Loading...</span>
                </p>
            </div>
        </div>
    `;

    // Add everything to the document
    document.head.appendChild(styleSheet);
    document.head.appendChild(fontLink);
    document.head.appendChild(fontLink2);
    document.head.appendChild(fontFamily);
    document.body.appendChild(parkedContainer);

    // Load server info
    async function loadServerInfo() {
        try {
            const response = await fetch('https://imarya.lol/servers.txt');
            const text = await response.text();
            
            if (!text.trim()) {
                throw new Error('No server data available');
            }
            
            const [domain, serverName] = text.split(':');
            document.getElementById('parked-domain').textContent = domain || 'Not Available';
            document.getElementById('parked-server').textContent = 
                (!serverName || serverName.trim().toLowerCase() === 'unused') 
                    ? 'Not Provisioned' 
                    : serverName;
            
        } catch (error) {
            console.error('Error loading server information:', error);
            document.getElementById('parked-domain').textContent = window.location.hostname;
            document.getElementById('parked-server').textContent = 'Not Registered';
        }
    }

    // Load server info immediately
    loadServerInfo();
})();