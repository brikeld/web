document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    let activeTimelines = [];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'page3') {
                const ratio = entry.intersectionRatio;
                if (ratio >= 0.95) { // Changed from 0.5 to 0.95
                    // When page3 is almost fully visible
                    console.log(`Arrived at ${entry.target.id}`);
                    startSquaresAnimation();
                    if (typeof startParaCreation === 'function') {
                        startParaCreation();
                    }
                } else {
                    // As soon as we start scrolling away
                    console.log(`Leaving ${entry.target.id}`);
                    reverseSquaresAnimation();
                    if (typeof reverseParaCreation === 'function') {
                        reverseParaCreation();
                    }
                }
            }
        });
    }, { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1] // More granular thresholds
    });

    pages.forEach(page => {
        observer.observe(page);
    });
});

// Encapsulate the animation code into a function
function startSquaresAnimation() {
    const animations = ['anim1', 'anim2', 'anim3'];
    activeTimelines = [];

    setTimeout(() => {
        animations.forEach((animId, index) => {
            const svgObject = document.getElementById(animId);
            
            if (svgObject.contentDocument) {
                const timeline = startAnimation(svgObject.contentDocument, index + 1);
                if (timeline) activeTimelines.push(timeline);
            } else {
                svgObject.addEventListener("load", function() {
                    const timeline = startAnimation(svgObject.contentDocument, index + 1);
                    if (timeline) activeTimelines.push(timeline);
                });
            }
        });
    }, 2000);
}

function reverseSquaresAnimation() {
    activeTimelines.forEach(timeline => {
        timeline.reverse();
    });
}

function startAnimation(svgDoc, index) {
    const textPath = svgDoc.querySelector('textPath');
    if (!textPath) return null;

    // Create a timeline for continuous movement
    const timeline = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" }
    });

    // Set initial state
    gsap.set(textPath, {
        attr: { startOffset: "100%" }
    });

    // Create the animation
    timeline.to(textPath, {
        attr: { startOffset: "-910%" },
        duration: 50,
        ease: "none"
    });

    return timeline;
}
////////////////////////////////////////
////////////////////////////////////////

////////////////////////////////////////


