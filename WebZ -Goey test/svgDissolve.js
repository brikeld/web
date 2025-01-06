function dissolveSVGs() {
    const svgElements = document.querySelectorAll('.p3_black-SVG img');
    
    svgElements.forEach((svg, index) => {
        // Add transition properties
        svg.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
        
        // Add slight delay for each SVG
        setTimeout(() => {
            // Random direction for each SVG
            const randomAngle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 200;
            const x = Math.cos(randomAngle) * distance;
            const y = Math.sin(randomAngle) * distance;
            
            // Apply transformation and fade out
          /*  svg.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;*/
            svg.style.opacity = '0';
        }, index * 200); // Stagger the animations
    });
}

// Create observer to watch for page3
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Wait 4 seconds then dissolve SVGs
            setTimeout(dissolveSVGs, 8600);
            observer.disconnect(); // Stop observing after triggering
        }
    });
}, {
    threshold: 0.5
});

// Start observing page3
document.addEventListener('DOMContentLoaded', () => {
    const page3 = document.getElementById('page3');
    if (page3) {
        observer.observe(page3);
    }
});
