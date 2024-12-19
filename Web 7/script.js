/* ----------------------------------------------------------- */
/* ------------------- Global Variables ---------------------- */
/* ----------------------------------------------------------- */

let activeTimelines = [];
let lastScrollPosition = window.pageYOffset;
let svgAnimations = [];
let isAnimating = false;  // Track animation state

/* ----------------------------------------------------------- */
/* ------------------ Main Setup ---------------------------- */
/* ----------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Setup Observers
    setupPageObservers();
});

function setupPageObservers() {
    const pages = document.querySelectorAll('.page');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const pageId = entry.target.id;
            const ratio = entry.intersectionRatio;
            
            switch(pageId) {
                case 'page1':
                    handlePage1Animations(ratio);
                    break;
                case 'page2':
                    handlePage2Animations(ratio);
                    break;
                case 'page3':
                    handlePage3Animations(ratio, entry);
                    break;
                case 'page4':
                    handlePage4Animations(ratio);
                    break;
            }
        });
    }, { 
        threshold: Array.from({length: 101}, (_, i) => i / 100)
    });

    pages.forEach(page => observer.observe(page));
}

/* ----------------------------------------------------------- */
/* ------------------------ Tableau 1 ------------------------ */
/* ----------------------------------------------------------- */

function handlePage1Animations(ratio) {
    if (ratio < 0.5 && !isAnimating) {
        // Moving down from page1
        isAnimating = true;
    } else if (ratio > 0.5 && isAnimating) {
        // Moving back up to page1
        console.log('Moving back up to page1');
        reverseSVGAnimation();
    }
}

/* ----------------------------------------------------------- */
/* ------------------------ Tableau 2 ------------------------ */
/* ----------------------------------------------------------- */

function handlePage2Animations(ratio) {
    const p2TextContainer = document.querySelector('.p2_text-container');
    // Calculate bottom value from 100vh to 0vh
    const bottomValue = (1 - ratio) * 100;
    // Animate bottom property using GSAP
    gsap.to(p2TextContainer, {
        bottom: `${bottomValue}vh`,
        ease: 'none',
        duration: 0.51 // Short duration for smooth update
    });
}

/* ----------------------------------------------------------- */
/* ------------------------ Tableau 3 ------------------------ */
/* ----------------------------------------------------------- */

function handlePage3Animations(ratio, entry) {
    if (ratio >= 0.95) {
        startSquaresAnimation();
        if (typeof startParaCreation === 'function') {
            startParaCreation();
        }
    } else {
        reverseSquaresAnimation();
        if (typeof reverseParaCreation === 'function') {
            reverseParaCreation();
        }
    }
}

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
    }, 3000);
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

function handlePage4Animations(ratio) {
    // Add any Page 4 specific functions here
}


