/* ----------------------------------------------------------- */
/* ------------------- Global Variables ---------------------- */
/* ----------------------------------------------------------- */

let activeTimelines = [];
let svgAnimations = [];
let isAnimating = false;  // Track animation state

/* ----------------------------------------------------------- */
/* ------------------ Intersection Observer ------------------ */
/* ----------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio;
            
            if (entry.target.id === 'page1') {
                if (ratio < 0.5 && !isAnimating) {
                    // Moving down from page1
                    console.log('Moving down from page1');
                    isAnimating = true;
                    animateSVGsToPage2();
                } else if (ratio > 0.5 && isAnimating) {
                    // Moving back up to page1
                    console.log('Moving back up to page1');
                    reverseSVGAnimation();
                }
            }
            
            if (ratio >= 0.95) {
                // When any page is almost fully visible
                console.log(`Arrived at ${entry.target.id}`);
                
                // Specific actions for page3
                if (entry.target.id === 'page3') {
                    startSquaresAnimation();
                    if (typeof startParaCreation === 'function') {
                        startParaCreation();
                    }
                }
            } else {
                // When leaving any page
                console.log(`Leaving ${entry.target.id}`);
                
                // Specific actions for page3
                if (entry.target.id === 'page3') {
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

/* ----------------------------------------------------------- */
/* ------------------------ Tableau 1 ------------------------ */
/* ----------------------------------------------------------- */

// No specific Page 1 functions currently
// Page 1 serves as starting point for animations

/* ----------------------------------------------------------- */
/* ------------------------ Tableau 2 ------------------------ */
/* ----------------------------------------------------------- */

function animateSVGsToPage2() {
    // Clear any existing animations
    svgAnimations.forEach(tl => tl.kill());
    svgAnimations = [];

    const originalLetters = document.querySelectorAll('#page1 .p1_rectangle img');
    const targetLetters = document.querySelectorAll('#page2 .moving-letter');
    
    // Get center letter's dimensions for reference
    const centerLetter = document.querySelector('#page1 .p1_center-rectangle img');
    const centerRect = centerLetter.getBoundingClientRect();
    const centerWidth = centerRect.width;
    const sideWidth = centerWidth * 0.7; // Make side letters 70% of center letter size
    
    // Calculate positions for side-by-side arrangement
    const spacing = 20; // Gap between SVGs
    const totalWidth = centerWidth + (sideWidth * 2) + (spacing * 2);
    const startX = (window.innerWidth - totalWidth) / 2;
    
    // You can also adjust the Y position here
    const targetY = window.innerHeight / 2 - centerRect.height / 2;
    
    const masterTimeline = gsap.timeline({
        onComplete: () => {
            console.log('Animation complete');
            isAnimating = true;
        }
    });
    
    originalLetters.forEach((orig, index) => {
        const target = targetLetters[index];
        const origRect = orig.getBoundingClientRect();
        
        // Calculate target width based on position
        const targetWidth = index === 1 ? centerWidth : sideWidth;
        
        // Calculate target X position (adjusting for different widths)
        let targetX;
        if (index === 0) {
            targetX = startX;
        } else if (index === 1) {
            targetX = startX + sideWidth + spacing;
        } else {
            targetX = startX + sideWidth + spacing + centerWidth + spacing;
        }
        
        // Set initial state
        gsap.set(target, {
            opacity: 0,
            x: origRect.left,
            y: origRect.top,
            width: origRect.width,
            filter: 'none'
        });
        
        // Create individual timeline
        const tl = gsap.timeline();
        
        tl.to(target, {
            opacity: 1,
            x: targetX,
            y: targetY,
            width: targetWidth,
            filter: 'brightness(0)', // Make SVG black
            duration: 1.2,
            ease: "power2.inOut"
        })
        .to(orig, {
            opacity: 0,
            duration: 0.8
        }, 0);
        
        masterTimeline.add(tl, 0);
        svgAnimations.push(tl);
    });
}

function reverseSVGAnimation() {
    if (!isAnimating) return;

    const originalLetters = document.querySelectorAll('#page1 .p1_rectangle img');
    const targetLetters = document.querySelectorAll('#page2 .moving-letter');
    
    const masterTimeline = gsap.timeline({
        onComplete: () => {
            console.log('Reverse animation complete');
            isAnimating = false;
        }
    });

    originalLetters.forEach((orig, index) => {
        const target = targetLetters[index];
        const origRect = orig.getBoundingClientRect();
        
        const tl = gsap.timeline();
        
        tl.to(target, {
            opacity: 0,
            x: origRect.left,
            y: origRect.top,
            width: origRect.width,
            filter: 'none',
            duration: 0.8,
            ease: "power2.inOut"
        })
        .to(orig, {
            opacity: 1,
            duration: 1.2
        }, 0);
        
        masterTimeline.add(tl, 0);
    });
}

/* ----------------------------------------------------------- */
/* ------------------------ Tableau 3 ------------------------ */
/* ----------------------------------------------------------- */

function startSquaresAnimation() {
    const animations = ['anim1', 'anim2', 'anim3'];
    activeTimelines = []; // Reset the array instead of declaring it

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

/* ----------------------------------------------------------- */
/* ------------------------ Tableau 4 ------------------------ */
/* ----------------------------------------------------------- */

// Add any Page 4 specific functions here

// text derriere page 1 
// background disparait texte rmains 
// svg remains 
// then dissolve everything 


//page 3 disparait plus lentement, arrive plus lentement 
// regarde indesing, elements disparait, mise en page devient plus facile a comprendre 

