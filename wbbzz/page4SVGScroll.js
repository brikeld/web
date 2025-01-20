let overlayTimeout;
let reloadTimeout;
let isAtBottom = false;
let isBackgroundHidden = false;

function initPage4SVGScroll() {
    const page4 = document.getElementById('page4');
    const container = page4.querySelector('.p4_text-container');
    
    const asciiPatterns = [
        `
░░░░░░░░░░░░░░░█████████████████████████
░░░░░░░░░░░░░░██░█████████░░███░░░░░███░
░░░░░░░░░░░░░██░████████░░░████░░░████░░
░░░░░░░░░░░░██████████░░░██████░░████░░░
░░░░░░░░░░░██████████░░░████░█░░████████
░░░░░░░░░░█████████░░░██░██░██████░░░░██
░░░░░░░░░█████████░░░██░█████████░░░██░█
░░░░░░░░█████████░███░██████████░███████
░░░░░░░█████████░██░███████████░████████
░░░░░█████████░░░░███████████████████░░█
░░░██████████░███████████████████████░░█
░████░█░██████████████████████████░░█░░█
██░██░█████░░██░██████████████░██░░█░░░█
█░██░░████████░██████████████░██░░██░░██
░██░░████████░██████████████░█░░░░█░███░
██░░████░██░█████████████████░░░░████░░░
█░░█████░░████████████░░████░░░░███░░░░░
███████░░███████████░░░████░░░██░░░░░░░░
██████████████████░░░░█░█░░█████░░░░░░░░
███████████░███░░░░░██░█░███░██░░░░░░░░░
██░███████░███░░░███░████░░░██░░░░░░░░░░
████████░███░░████░░███░░░░█░░░░░░░░░░░░
█░░███░███░░░░░░█████░░░░░█░░░░░░░░░░░░░
███████░░░░░█████░██░░░░██░░░░░░░░░░░░░░
████████████░░░░░░██████░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

        `,
        `
░░░░░░░░░░░░░░░█████████████████████████
░░░░░░░░░░░░░░██░█████████░░███░░░░░███░
░░░░░░░░░░░░░██░████████░░░████░░░████░░
░░░░░░░░░░░░██████████░░░██████░░████░░░
░░░░░░░░░░░██████████░░░████░█░░████████
░░░░░░░░░░█████████░░░██░██░██████░░░░██
░░░░░░░░░█████████░░░██░█████████░░░██░█
░░░░░░░░█████████░███░██████████░███████
░░░░░░░█████████░██░███████████░████████
░░░░░█████████░░░░███████████████████░░█
░░░██████████░███████████████████████░░█
░████░█░██████████████████████████░░█░░█
██░██░█████░░██░██████████████░██░░█░░░█
█░██░░████████░██████████████░██░░██░░██
░██░░████████░██████████████░█░░░░█░███░
██░░████░██░█████████████████░░░░████░░░
█░░█████░░████████████░░████░░░░███░░░░░
███████░░███████████░░░████░░░██░░░░░░░░
██████████████████░░░░█░█░░█████░░░░░░░░
███████████░███░░░░░██░█░███░██░░░░░░░░░
██░███████░███░░░███░████░░░██░░░░░░░░░░
████████░███░░████░░███░░░░█░░░░░░░░░░░░
█░░███░███░░░░░░█████░░░░░█░░░░░░░░░░░░░
███████░░░░░█████░██░░░░██░░░░░░░░░░░░░░
████████████░░░░░░██████░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

        `,
        `
░░░░░░░░░░░░░░░█████████████████████████
░░░░░░░░░░░░░░██░█████████░░███░░░░░███░
░░░░░░░░░░░░░██░████████░░░████░░░████░░
░░░░░░░░░░░░██████████░░░██████░░████░░░
░░░░░░░░░░░██████████░░░████░█░░████████
░░░░░░░░░░█████████░░░██░██░██████░░░░██
░░░░░░░░░█████████░░░██░█████████░░░██░█
░░░░░░░░█████████░███░██████████░███████
░░░░░░░█████████░██░███████████░████████
░░░░░█████████░░░░███████████████████░░█
░░░██████████░███████████████████████░░█
░████░█░██████████████████████████░░█░░█
██░██░█████░░██░██████████████░██░░█░░░█
█░██░░████████░██████████████░██░░██░░██
░██░░████████░██████████████░█░░░░█░███░
██░░████░██░█████████████████░░░░████░░░
█░░█████░░████████████░░████░░░░███░░░░░
███████░░███████████░░░████░░░██░░░░░░░░
██████████████████░░░░█░█░░█████░░░░░░░░
███████████░███░░░░░██░█░███░██░░░░░░░░░
██░███████░███░░░███░████░░░██░░░░░░░░░░
████████░███░░████░░███░░░░█░░░░░░░░░░░░
█░░███░███░░░░░░█████░░░░░█░░░░░░░░░░░░░
███████░░░░░█████░██░░░░██░░░░░░░░░░░░░░
████████████░░░░░░██████░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

        `,
    ];
    
    let lastScrollPosition = 0;
    let svgCount = 0.01;
    const maxSVGs = 22;

    function createRandomAsciiArt() {
        const asciiDiv = document.createElement('pre');
        const randomPattern = asciiPatterns[Math.floor(Math.random() * asciiPatterns.length)];
        asciiDiv.textContent = randomPattern;
        
        asciiDiv.style.position = 'absolute';
        asciiDiv.style.left = `${Math.random() * 50}%`;
        asciiDiv.style.top = `${Math.random() * 100}%`;
        asciiDiv.style.fontSize = '23px';
        asciiDiv.style.lineHeight = '11px';
        asciiDiv.style.color = '#000';
        asciiDiv.style.whiteSpace = 'pre';
        asciiDiv.style.fontFamily = 'HALTimezoneTest, monospace';
        asciiDiv.style.transition = 'all 0.3s ease';
        
        animateAscii(asciiDiv);
        return asciiDiv;
    }

    function animateAscii(asciiDiv) {
        const characters = 'x#%&$*+=-:.';
        const asciiText = asciiDiv.textContent;
        const asciiChars = [];
        
        // Convert text content into individual character spans
        asciiDiv.innerHTML = asciiText.split('').map(char => {
            if (char === '\n') return '<br>';
            return `<span class="ascii-char">${char}</span>`;
        }).join('');
        
        const charSpans = asciiDiv.querySelectorAll('.ascii-char');
        
        // Animate characters
        setInterval(() => {
            charSpans.forEach(span => {
                span.textContent = characters[Math.floor(Math.random() * characters.length)];
            });
        }, 100);
        
        // GSAP animation for scaling
        gsap.to(asciiDiv, {
            scale: 1.1,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }

    function handleScroll() {
        const currentScroll = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        
        if (currentScroll >= maxScroll - 10) {
            if (!isAtBottom) {
                isAtBottom = true;
                const overlayText = document.getElementById('p4_overlay-text');
                if (overlayText && !isBackgroundHidden) {
                    overlayText.style.background = 'none';
                    isBackgroundHidden = true;
                }
                reloadTimeout = setTimeout(() => {
                    location.reload();
                }, 5000);
            }
        } else {
            if (isAtBottom) {
                isAtBottom = false;
                clearTimeout(reloadTimeout);
            }
        }

        if (currentScroll > lastScrollPosition && !isAtBottom && svgCount < maxSVGs) {
            const numToAdd = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < numToAdd; i++) {
                if (svgCount < maxSVGs) {
                    const asciiArt = createRandomAsciiArt();
                    asciiArt.style.transform = `scale(0.3) rotate(${Math.random() * 360}deg)`;
                    asciiArt.style.transformOrigin = 'center center';
                    page4.appendChild(asciiArt);
                    svgCount++;
                }
            }
        }

        const scrollRatio = currentScroll / maxScroll;
        const inverted = 255 - Math.floor(scrollRatio * 255);
        page4.style.backgroundColor = `rgb(${inverted}, ${inverted}, ${inverted})`;

        lastScrollPosition = currentScroll;

        const overlayText = document.getElementById('p4_overlay-text');
        if (overlayText && !isBackgroundHidden) {
            overlayText.style.display = 'block';
            clearTimeout(overlayTimeout);
            overlayTimeout = setTimeout(() => {
                overlayText.style.display = 'none';
            }, 2000);
        }
    }

    container.addEventListener('scroll', throttle(handleScroll, 200));

    const page4Button = document.getElementById('page4_button');
    if (page4Button) {
        const buttonObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activeTimelines.forEach(timeline => timeline.kill());
                } else {
                    startSquaresAnimation();
                }
            });
        }, { threshold: 0.5 });

        buttonObserver.observe(page4Button);
    }
}

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

document.addEventListener('DOMContentLoaded', initPage4SVGScroll);