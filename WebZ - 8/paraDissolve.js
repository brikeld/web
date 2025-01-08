document.addEventListener("DOMContentLoaded", function() {
    const deconstructText = (element) => {
        if (!element) return;
        
        const chars = element.querySelectorAll(".char");
        chars.forEach((char) => {
            const startPosition = getRandomStartPosition();
            char.style.setProperty("--start-x", `${startPosition.x}px`);
            char.style.setProperty("--start-y", `${startPosition.y}px`);
            
            // Remove existing animations first
            char.style.animation = 'none';
            char.offsetHeight; // Force reflow
            
            // Add dissolve class
            char.classList.add("dissolve");
        });
    };

    const dissolveSVGText = () => {
        const animations = ['anim1', 'anim2', 'anim3'];
        
        animations.forEach((animId) => {
            const svgObject = document.getElementById(animId);
            if (svgObject && svgObject.contentDocument) {
                const textPath = svgObject.contentDocument.querySelector('textPath');
                if (textPath) {
                    textPath.style.opacity = '1';
                    textPath.style.transition = 'opacity 2s ease-out';
                    textPath.style.opacity = '0';
                }
            }
        });
    };
    
    const getRandomStartPosition = () => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 500; // Increased distance for more dramatic effect
        return {
            x: Math.cos(angle) * distance*2,
            y: Math.sin(angle) * distance*2,
        };
    };

    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    // Handle text elements
                    const p3_text3 = document.getElementById("p3_text3");
                    const p3_text4 = document.getElementById("p3_text4");
                    
                    if (p3_text3) {
                        setTimeout(() => {
                            deconstructText(p3_text3);
                        }, 5200); // Wait for initial animation to complete
                    }
                    
                    if (p3_text4) {
                        setTimeout(() => {
                            deconstructText(p3_text4);
                        }, 6000); // Wait for initial animation to complete
                    }

                    // Handle SVG text paths
                    setTimeout(() => dissolveSVGText(), 5900);
                    
                    observer.disconnect();
                }, 3000);
            }
        });
    }, {
        threshold: 0.5
    });

    const page3 = document.getElementById("page3");
    if (page3) {
        observer.observe(page3);
    }
});
