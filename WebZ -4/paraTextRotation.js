 /* document.addEventListener('DOMContentLoaded', () => {
    const p2Container = document.querySelector('.p2_text-container');
    const p2Text = document.getElementById('p2_text2');
    const p2Text3 = document.getElementById('p2_text3');
    let lastScrollTop = 0;

    function splitTextIntoSpans(element) {
        if (!element) return;
        const lines = element.innerHTML.split('<br>');
        const wrappedLines = lines.map(line => 
            line.split('').map(char => 
                char === ' ' ? ' ' : `<span class="rotatable-char">${char}</span>`
            ).join('')
        );
        element.innerHTML = wrappedLines.join('<br>');
    }

    function getRandomRotation() {
        return Math.random() * 720 - 360; // Random rotation between -360 and 360 degrees
    }

    function initializeRandomRotations(chars) {
        chars.forEach(char => {
            gsap.set(char, {
                rotation: getRandomRotation()
            });
        });
    }

    function handleScroll() {
        if (!p2Text && !p2Text3) return;
        
        const chars = [...(p2Text?.querySelectorAll('.rotatable-char') || []),
                      ...(p2Text3?.querySelectorAll('.rotatable-char') || [])];
        const currentScroll = p2Container.scrollTop;
        
        // Calculate progress (0 at top, 1 at bottom)
        const scrollProgress = currentScroll / (p2Container.scrollHeight - p2Container.clientHeight);
        const normalizedProgress = Math.min(1, Math.max(0, scrollProgress));

        chars.forEach(char => {
            const currentRotation = gsap.getProperty(char, "rotation") || 0;
            
            gsap.to(char, {
                duration: 0.2,
                rotation: currentRotation * (1 - normalizedProgress),
                ease: "power1.out"
            });
        });

        lastScrollTop = currentScroll;
    }

    // Initialize both texts
    if (p2Text) {
        splitTextIntoSpans(p2Text);
        const chars = p2Text.querySelectorAll('.rotatable-char');
        initializeRandomRotations(chars);
    }
    if (p2Text3) {
        splitTextIntoSpans(p2Text3);
        const chars = p2Text3.querySelectorAll('.rotatable-char');
        initializeRandomRotations(chars);
    }
    p2Container?.addEventListener('scroll', handleScroll);
});
  // document.addEventListener('DOMContentLoaded', () => {
    const p2Container = document.querySelector('.p2_text-container');
    const p2Text = document.getElementById('p2_text2');
    const p2Text3 = document.getElementById('p2_text3');
    let lastScrollTop = 0;

    function splitTextIntoSpans(element) {
        if (!element) return;
        const lines = element.innerHTML.split('<br>');
        const wrappedLines = lines.map(line => 
            line.split('').map(char => 
                char === ' ' ? ' ' : `<span class="rotatable-char">${char}</span>`
            ).join('')
        );
        element.innerHTML = wrappedLines.join('<br>');
    }

    function getRandomRotation() {
        return Math.random() * 720 - 360; // Random rotation between -360 and 360 degrees
    }

    function initializeRandomRotations(chars) {
        chars.forEach(char => {
            gsap.set(char, {
                rotation: getRandomRotation()
            });
        });
    }

    function handleScroll() {
        if (!p2Text && !p2Text3) return;
        
        const chars = [...(p2Text?.querySelectorAll('.rotatable-char') || []),
                      ...(p2Text3?.querySelectorAll('.rotatable-char') || [])];
        const currentScroll = p2Container.scrollTop;
        
        // Calculate progress (0 at top, 1 at bottom)
        const scrollProgress = currentScroll / (p2Container.scrollHeight - p2Container.clientHeight);
        const normalizedProgress = Math.min(1, Math.max(0, scrollProgress));

        chars.forEach(char => {
            const currentRotation = gsap.getProperty(char, "rotation") || 0;
            
            gsap.to(char, {
                duration: 0.2,
                rotation: currentRotation * (1 - normalizedProgress),
                ease: "power1.out"
            });
        });

        lastScrollTop = currentScroll;
    }

    // Initialize both texts
    if (p2Text) {
        splitTextIntoSpans(p2Text);
        const chars = p2Text.querySelectorAll('.rotatable-char');
        initializeRandomRotations(chars);
    }
    if (p2Text3) {
        splitTextIntoSpans(p2Text3);
        const chars = p2Text3.querySelectorAll('.rotatable-char');
        initializeRandomRotations(chars);
    }
    p2Container?.addEventListener('scroll', handleScroll);
});


*/



