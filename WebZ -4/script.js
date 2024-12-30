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
                    // Empty handler
                    break;
                case 'page2':
                    handlePage2Animations(ratio);
                    break;
                case 'page3':
                    // Empty handler
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
/* ------------------------ Tableau 2 ------------------------ */
/* ----------------------------------------------------------- */



/* ----------------------------------------------------------- */
/* ------------------------ Tableau 4 ------------------------ */
/* ----------------------------------------------------------- */

function handlePage4Animations(ratio) {
    // Add any Page 4 specific functions here
}


