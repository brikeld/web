function getRandomStartPosition(distance) {
    const angle = Math.random() * Math.PI * 2;
    const randomDistance = distance + Math.random() * distance / 2;
    return {
        x: Math.cos(angle) * randomDistance + window.innerWidth / 2,
        y: Math.sin(angle) * randomDistance + window.innerHeight / 2
    };
}

function startParaCreation(elementId, config = {}) {
    const defaults = {
        duration: 2,
        delay: 0,
        distance: 590,
        randomizeDistance: true,
        animationDuration: 0.1,
        finalDelay: 2000,
        reverseAtEnd: true,
        easing: 'ease',
        randomizeDirections: true,
        minScale: 0.5,
        maxScale: 1.5,
        rotationRange: 360
    };

    // Merge defaults with provided config
    const options = { ...defaults, ...config };
    
    const element = document.getElementById(elementId);
    if (!element) return;

    // Save original HTML for final layout
    if (!element.hasAttribute('data-original-html')) {
        element.setAttribute('data-original-html', element.innerHTML);
    }

    // Get the original HTML content
    const originalHtml = element.innerHTML;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHtml;

    // Get text content while preserving line breaks
    const textNodes = [];
    function extractTextNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node.textContent);
        } else if (node.tagName === 'BR') {
            textNodes.push('\n');
        } else {
            node.childNodes.forEach(child => extractTextNodes(child));
        }
    }
    extractTextNodes(tempDiv);

    const text = textNodes.join('');
    const characters = text.split('');
    element.innerHTML = '';

    characters.forEach((char, index) => {
        if (char === '\n') {
            element.appendChild(document.createElement('br'));
        } else if (char.trim() === '') {
            element.appendChild(document.createTextNode(' '));
        } else {
            const span = document.createElement('span');
            const charDelay = (index * options.duration) / characters.length + options.delay;
            let start = { x: 0, y: 0 };
            
            if (options.randomizeDistance) {
                start = getRandomStartPosition(options.distance);
            } else {
                start.x = options.distance;
                start.y = options.distance;
            }

            const rotation = options.randomizeDirections ? 
                Math.random() * options.rotationRange : 0;
            
            const scale = options.randomizeDirections ? 
                options.minScale + Math.random() * (options.maxScale - options.minScale) : 1;

            span.className = 'char';
            span.textContent = char;
            span.style.cssText = `
                --start-x: ${start.x}px;
                --start-y: ${start.y}px;
                --rotation: ${rotation}deg;
                --scale: ${scale};
                animation: appear ${options.animationDuration}s ${options.easing} ${charDelay}s forwards;
                position: relative;
                display: inline-block;
            `;
            element.appendChild(span);
        }
    });

    // Force reflow and start animation
    void element.offsetWidth;
    element.style.display = 'block';
    element.style.opacity = '1';

    // Add @keyframes rule for custom animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes appear {
            0% {
                opacity: 0;
                transform: translate(var(--start-x), var(--start-y)) rotate(var(--rotation)) scale(var(--scale));
            }
            100% {
                opacity: 1;
                transform: translate(0, 0) rotate(0deg) scale(1);
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Skip final reversion for specific elements if needed
    if (!options.reverseAtEnd) return;

    // Restore original layout after animation
    const totalDuration = options.duration * 1000 + options.finalDelay;
    setTimeout(() => {
        element.innerHTML = element.getAttribute('data-original-html');
    }, totalDuration);
}

function reverseParaCreation() {
    const elements = [
        document.getElementById('p3_text2')
    ];
    elements.forEach(element => {
        if (element) {
            const chars = element.querySelectorAll('.char');
            chars.forEach(char => {
                char.classList.remove('char');
            });
        }
    });
}

// Make the function globally available
window.startParaCreation = startParaCreation;
window.reverseParaCreation = reverseParaCreation;