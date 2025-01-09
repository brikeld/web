function getRandomStartPosition(distance) {
    const angle = Math.random() * Math.PI * 2;
    const randomDist = distance * (0.5 + Math.random());
    return {
        x: Math.cos(angle) * randomDist,
        y: Math.sin(angle) * randomDist
    };
}

function startParaCreationPage2(elementId, config = {}) {
    const defaults = {
        duration: 0.5, // Duration for each line animation
        delay: 0.1, // Delay between lines
        distance: 100, // Distance for the animation
        easing: 'ease-out', // Easing for the animation
        minScale: 0.8, // Minimum scale for the lines
        maxScale: 1.2, // Maximum scale for the lines
        rotationRange: 10, // Rotation range for the lines
    };

    // Merge defaults with provided config
    const options = { ...defaults, ...config };

    const element = document.getElementById(elementId);
    if (!element) return;

    // Save original HTML for final layout
    if (!element.hasAttribute('data-original-html')) {
        element.setAttribute('data-original-html', element.innerHTML);
    }

    // Split the text into words
    const rawLines = element.innerHTML.split('<br>');
    element.innerHTML = '';
    rawLines.forEach((line) => {
        const lineContainer = document.createElement('div');
        lineContainer.className = 'line';

        // Split into characters
        const chars = line.split('');
        chars.forEach((char) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            if (char === ' ') charSpan.style.width = '0.5em';
            const { x, y } = getRandomStartPosition(options.distance);
            charSpan.style.transform = `translate(${x}px, ${y}px) scale(${options.minScale})`;
            charSpan.style.opacity = '0';
            charSpan.textContent = char;
            lineContainer.appendChild(charSpan);
        });
        element.appendChild(lineContainer);
    });
}

// Make the function globally available
window.startParaCreationPage2 = startParaCreationPage2;

function initScrollSyncPage2() {
    gsap.registerPlugin(ScrollTrigger);

    // Function to animate characters based on scroll progress
    function revealLines(element, progress) {
        const chars = element.querySelectorAll('.char');
        const totalChars = chars.length;
        const charsToShow = Math.floor(totalChars * progress);

        chars.forEach((char, index) => {
            if (index <= charsToShow) {
                gsap.to(char, {
                    duration: 0.5,
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    ease: "power2.out"
                });
            } else {
                gsap.to(char, {
                    duration: 0.5,
                    opacity: 0,
                    x: getRandomStartPosition(100).x,
                    y: getRandomStartPosition(100).y,
                    scale: 0.8,
                    ease: "power2.out"
                });
            }
        });
    }

    // Create ScrollTrigger for each text element
    ["p2_text2", "p2_text3"].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            ScrollTrigger.create({
                trigger: element,
                start: "top 80%", // Adjust this value to control when the animation starts
                end: "bottom 20%", // Adjust this value to control when the animation ends
                onUpdate: (self) => {
                    const scrollProgress = self.progress; // Get scroll progress (0 to 1)
                    revealLines(element, scrollProgress);
                },
                markers: false // Enable markers for debugging if needed
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollSyncPage2();
});