document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'page3') {
                const ratio = entry.intersectionRatio;
                if (ratio >= 0.5) {
                    // When page3 is at least 50% visible
                    console.log(`Arrived at ${entry.target.id}`);
                    startSquaresAnimation();
                    if (typeof startParaCreation === 'function') {
                        startParaCreation();
                    }
                } else {
                    // When page3 is less than 50% visible
                    console.log(`Leaving ${entry.target.id}`);
                    if (typeof reverseParaCreation === 'function') {
                        reverseParaCreation();
                    }
                }
            }
        });
    }, { threshold: [0, 0.5, 1] }); // Adjust the threshold value here to change when leaving page 3

    pages.forEach(page => {
        observer.observe(page);
    });
});

// Encapsulate the animation code into a function
function startSquaresAnimation() {
    const animations = ['anim1', 'anim2', 'anim3'];

    setTimeout(() => {
        animations.forEach((animId, index) => {
            const svgObject = document.getElementById(animId);
            
            if (svgObject.contentDocument) {
                startAnimation(svgObject.contentDocument, index + 1);
            } else {
                svgObject.addEventListener("load", function() {
                    startAnimation(svgObject.contentDocument, index + 1);
                });
            }
        });
    }, 2000);
}

function startAnimation(svgDoc, index) {
    const textPath = svgDoc.querySelector('textPath');
    if (!textPath) return;

    // Create a timeline for continuous movement
    const timeline = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" }
    });

    // Set initial state
    gsap.set(textPath, {
        attr: { startOffset: "100%" },
        // fontSize: "4.5em",
    });

    // Create the animation
    timeline
        .to(textPath, {
            // fontSize: "1.5em",
            attr: { startOffset: "-910%" }, 
            duration: 50,
            ease: "none"
        }, );
}
////////////////////////////////////////
////////////////////////////////////////

////////////////////////////////////////


