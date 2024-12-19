

document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.querySelector('.p4_text-container');
    const textElement = document.getElementById('p4_text1');
    
    if (!textElement || !textContainer) {
        console.log('Required elements not found');
        return;
    }

    // Split text into spans for individual character rotation
    function splitTextIntoSpans() {
        const text = textElement.textContent;
        textElement.innerHTML = text.split('').map(char => 
            char === ' ' ? ' ' : `<span class="rotatable-char">${char}</span>`
        ).join('');
    }

    // Handle rotation based on scroll position
    function handleScroll() {
        requestAnimationFrame(() => {
            const chars = textElement.querySelectorAll('.rotatable-char');
            const scrollPercent = textContainer.scrollTop / (textContainer.scrollHeight - textContainer.clientHeight);
            
            chars.forEach((char, index) => {
                const rotation = scrollPercent * 360;
                gsap.to(char, {
                    duration: 0.1,
                    rotation: rotation,
                    ease: "none"
                });
            });
        });
    }

    // Initialize
    splitTextIntoSpans();
    textContainer.addEventListener('scroll', handleScroll);
}); 


