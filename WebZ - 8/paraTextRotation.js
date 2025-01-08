// Temporarily disabled text rotation animation
/*
document.addEventListener('DOMContentLoaded', () => {
    const p2Container = document.querySelector('.p2_text-container');
    if (!p2Container) return;

    const elements = {
        text2: document.getElementById('p2_text2'),
        text3: document.getElementById('p2_text3')
    };

    // Store original text layout
    const originalLayout = {
        text2: elements.text2?.innerHTML,
        text3: elements.text3?.innerHTML
    };

    let ticking = false;
    let lastScrollTop = 0;

    function handleScroll() {
        lastScrollTop = p2Container.scrollTop;
        if (!ticking) {
            requestAnimationFrame(() => {
                updateRotations(lastScrollTop);
                ticking = false;
            });
            ticking = true;
        }
    }

    function wrapCharactersInSpans(text) {
        // Keep the <br> tags intact and split text into lines
        const lines = text.split('<br>');
        
        // Process each line separately
        return lines.map(line => {
            return line.split('').map(char => {
                const rotation = Math.random() * 720 - 360;
                if (char === ' ') return ' ';
                return `<span class="rotatable-char" data-rotation="${rotation}">${char}</span>`;
            }).join('');
        }).join('<br>'); // Rejoin with <br> tags
    }

    function initializeText() {
        Object.entries(elements).forEach(([key, element]) => {
            if (element && originalLayout[key]) {
                element.innerHTML = wrapCharactersInSpans(originalLayout[key]);
            }
        });
    }

    function updateRotations(scrollTop) {
        const progress = Math.min(1, scrollTop / (p2Container.scrollHeight - p2Container.clientHeight));
        const chars = document.querySelectorAll('#p2_text2 .rotatable-char, #p2_text3 .rotatable-char');
        
        chars.forEach(char => {
            if (char.hasAttribute('data-rotation')) {
                const baseRotation = parseFloat(char.getAttribute('data-rotation'));
                // Apply rotation based on scroll progress
                char.style.transform = `rotateX(${baseRotation * progress}deg)`;
            }
        });
    }

    // Initialize the text wrapping
    initializeText();

    // Add scroll event listener
    p2Container.addEventListener('scroll', handleScroll, { passive: true });

    // Initial update to ensure proper starting state
    updateRotations(0);
});
*/
