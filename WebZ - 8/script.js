/* ----------------------------------------------------------- */
/* ------------------- Global Variables ---------------------- */
/* ----------------------------------------------------------- */

let activeTimelines = [];
let lastScrollPosition = window.pageYOffset;
let svgAnimations = [];
let isAnimating = false;  // Track animation state
let elts = {}; // Make elts accessible here

/* ----------------------------------------------------------- */
/* ------------------ morph ---------------------------- */
/* ----------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver((mutationsList, observer) => {
        elts = {
            text1: document.getElementById("p1_text3"),
            text2: document.getElementById("p1_text3_goey"),
            text3: document.getElementById("p1_text6_stroke"),
            text4: document.getElementById("p1_text6_stroke_goey")
        };
    });

    observer.observe(document.body, { childList: true, subtree: true });

    console.log(elts.text1, elts.text2);
});

document.addEventListener('DOMContentLoaded', () => {
    // Ensure GSAP and ScrollTrigger are loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const text1 = document.getElementById("p1_text3");
        const text2 = document.getElementById("p1_text3_goey");
        const stroke1 = document.getElementById("p1_text3_stroke");
        const stroke2 = document.getElementById("p1_text3_stroke_goey");

        const morphTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#page1",
                start: "top center",
                end: "bottom center",
                scrub: true,
                markers: false
            }
        });

        morphTimeline
            .to(text1, {
                opacity: 0,
                filter: "blur(100px) url(#gooey)",
                ease: "power1.inOut"
            })
            .to(text2, {
                opacity: 1,
                filter: "blur(0px) url(#gooey)",
                ease: "power1.inOut"
            }, 0)
            .to(stroke1, {
                opacity: 0,
                filter: "blur(100px) url(#gooey)",
                ease: "power1.inOut"
            }, 0)
            .to(stroke2, {
                opacity: 1,
                filter: "blur(0px) url(#gooey)",
                ease: "power1.inOut"
            }, 0);
    }
});

/* ----------------------------------------------------------- */
/* ------------------ end morph ---------------------------- */
/* ----------------------------------------------------------- */


/* ----------------------------------------------------------- */
/* ------------------ Main Setup ---------------------------- */
/* ----------------------------------------------------------- */




/* ----------------------------------------------------------- */
/* ------------------ PAGE2 ---------------------------- */
/* ----------------------------------------------------------- */
// Add this code to script.js, inside the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Initialize paragraph creation for page2
        startParaCreationPage2('p2_text2');
        startParaCreationPage2('p2_text3');

        // Add ScrollTrigger for page2
        ScrollTrigger.create({
            trigger: "#page2",
            scroller: ".snap-container",
            start: "top center", // Start when the top of page2 reaches the center of the viewport
            end: "bottom center", // End when the bottom of page2 reaches the center of the viewport
            onUpdate: (self) => {
                const scrollProgress = self.progress; // Get scroll progress (0 to 1)

                // Reveal lines based on scroll progress
                if (window.revealLines_p2_text2) {
                    window.revealLines_p2_text2(scrollProgress);
                }
                if (window.revealLines_p2_text3) {
                    window.revealLines_p2_text3(scrollProgress);
                }
            },
            markers: false // Enable markers for debugging if needed
        });
    }
});

/* ----------------------------------------------------------- */
/* ------------------ PAGE2 - END ---------------------------- */
/* ----------------------------------------------------------- */

/* ----------------------------------------------------------- */
/* ------------------ PAGE3 ---------------------------- */
/* ----------------------------------------------------------- */


document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Array of text elements to animate with custom configurations
        const textElements = [
            { 
                id: 'p3_text1',
                start: "top 40%",
                config: {
                    duration: 3,
                    delay: 0.5,
                    distance: 800,
                    animationDuration: 0.2,
                    randomizeDirections: true,
                    rotationRange: 720,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }
            },
            { 
                id: 'p3_text2',
                start: "top 70%",
                config: {
                    duration: 2,
                    distance: 400,
                    randomizeDistance: false,
                    animationDuration: 0.15,
                    minScale: 0.8,
                    maxScale: 1.2
                }
            },
            {
                id: 'p3_text3',
                start: "top 65%",
                config: {
                    duration: 2.5,
                    delay: 0.3,
                    distance: 600,
                    animationDuration: 0.25,
                    rotationRange: 360,
                    minScale: 0.7,
                    maxScale: 1.3
                }
            },
            {
                id: 'p3_text4',
                start: "top 60%",
                config: {
                    duration: 3,
                    delay: 0.2,
                    distance: 700,
                    animationDuration: 0.3,
                    randomizeDirections: true,
                    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
                }
            },
            {
                id: 'p3_text5',
                start: "top 55%",
                config: {
                    duration: 1.5,
                    delay: 0.1,
                    distance: 300,
                    animationDuration: 0.2,
                    rotationRange: 180,
                    minScale: 0.9,
                    maxScale: 1.1
                }
            },
            {
                id: 'p3_text6',
                start: "top 50%",
                config: {
                    duration: 2,
                    delay: 0.4,
                    distance: 500,
                    animationDuration: 0.25,
                    randomizeDirections: true,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                }
            },
            {
                id: 'p3_text7',
                start: "top 45%",
                config: {
                    duration: 2.8,
                    delay: 0.3,
                    distance: 900,
                    animationDuration: 0.35,
                    rotationRange: 540,
                    minScale: 0.4,
                    maxScale: 1.6
                }
            },
            {
                id: 'p3_text8',
                start: "top 40%",
                config: {
                    duration: 2.2,
                    delay: 0.2,
                    distance: 450,
                    animationDuration: 0.28,
                    randomizeDirections: true,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }
            },
            {
                id: 'p3_text9',
                start: "top 80%",
                config: {
                    duration: 3.5,
                    delay: 0.6,
                    distance: 1000,
                    animationDuration: 0.4,
                    rotationRange: 900,
                    minScale: 0.3,
                    maxScale: 1.7
                }
            },
            {
                id: 'p3_text10',
                start: "top 30%",
                config: {
                    duration: 2.5,
                    delay: 0.4,
                    distance: 600,
                    animationDuration: 0.3,
                    randomizeDirections: true,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }
            }
        ];

        textElements.forEach(({id, start, config}) => {
            ScrollTrigger.create({
                trigger: `#${id}`,
                scroller: ".snap-container",
                start: start,
                end: "bottom 20%",
                onEnter: () => {
                    const element = document.getElementById(id);
                    if (element && !element.hasAttribute('data-animated')) {
                        element.style.display = 'block';
                        element.style.visibility = 'visible';
                        element.style.opacity = '1';
                        
                        requestAnimationFrame(() => {
                            startParaCreation(id, config);
                            element.setAttribute('data-animated', 'true');
                        });
                    }
                },
                markers: false
            });
        });

        // Update ScrollTrigger to use main container's scroll
        ScrollTrigger.create({
            trigger: "#p3_text2",
            scroller: ".snap-container", // Specify the main scrolling container
            start: "top 70%",
            end: "bottom 20%",
            onEnter: () => {
                const p3_text2 = document.getElementById('p3_text2');
                if (p3_text2 && !p3_text2.hasAttribute('data-animated')) {
                    p3_text2.style.display = 'block';
                    p3_text2.style.visibility = 'visible';
                    p3_text2.style.opacity = '1'; // Set opacity to 1 to make it visible without animation
                    
                    // Restore animation
                    void p3_text2.offsetWidth;
                    requestAnimationFrame(() => {
                        startParaCreation('p3_text2', 3);
                        p3_text2.setAttribute('data-animated', 'true');
                    });
                }
            },
            markers: true
        });

        // Update ScrollTrigger defaults to use main container
        ScrollTrigger.defaults({
            scroller: ".snap-container"
        });

        // Initialize observer for page sections
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    switch(entry.target.id) {
                        case 'page2':
                            if (!entry.target.hasAttribute('data-animated')) {
                                handlePage2Animations();
                                entry.target.setAttribute('data-animated', 'true');
                            }
                            break;
                        case 'page4':
                            if (!entry.target.hasAttribute('data-animated')) {
                                handlePage4Animations();
                                entry.target.setAttribute('data-animated', 'true');
                            }
                            break;
                    }
                }
            });
        }, { 
            threshold: [0, 0.5], // Changed to better detect entry
            rootMargin: '0px'
        });

        document.querySelectorAll('.page').forEach(page => observer.observe(page));

        // Create observer for debugging p3_text2 position
        const p3_text2Observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bounds = entry.target.getBoundingClientRect();
                }
            });
        }, {
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });

        const p3_text2 = document.getElementById('p3_text2');
        if (p3_text2) {
            p3_text2Observer.observe(p3_text2);
        }

        // ScrollTrigger for p3_text2
        ScrollTrigger.create({
            trigger: "#p3_text2",
            scroller: ".snap-container", // Specify the main scrolling container
            start: "top 70%",
            end: "bottom 20%",
            onEnter: () => {
                const p3_text2 = document.getElementById('p3_text2');
                if (p3_text2 && !p3_text2.hasAttribute('data-animated')) {
                    p3_text2.style.display = 'block';
                    p3_text2.style.visibility = 'visible';
                    p3_text2.style.opacity = '1'; // Set opacity to 1 to make it visible without animation
                    
                    // Restore animation
                    void p3_text2.offsetWidth;
                    requestAnimationFrame(() => {
                        startParaCreation('p3_text2', 3);
                        p3_text2.setAttribute('data-animated', 'true');
                    });
                }
            },
            markers: true // Enable markers for debugging
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });

        // Initial refresh after everything is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 1000);
        });

        // initPage4SVGScroll(); // Removed or commented out
    } else {
        console.error('GSAP or ScrollTrigger not loaded');
    }
});

/* ----------------------------------------------------------- */
/* ------------------------ Tableau 2 ------------------------ */
/* ----------------------------------------------------------- */

function handlePage2Animations() {
    // Simplified animation logic
    const elements = document.querySelectorAll('#page2 [class*="p2_text"]');
    elements.forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
        );
    });
}

/* ----------------------------------------------------------- */
/* ------------------------ Tableau 4 ------------------------ */
/* ----------------------------------------------------------- */

function handlePage4Animations() {
    const container = document.querySelector('.p4_text-container');
    if (container) {
        gsap.fromTo(container,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
        );
    }
}

/* ----------------------------------------------------------- */
/* ------------------ SVG Path Animations ------------------- */
/* ----------------------------------------------------------- */

function startAnimation(svgDoc, delay) {
    if (!svgDoc) return null;
    
    const textPath = svgDoc.querySelector('textPath');
    const path = svgDoc.querySelector('path');
    
    if (!textPath || !path) return null;

    // Create timeline for this animation
    const tl = gsap.timeline({
        repeat: -1,
        defaults: { duration: 20, ease: "none" }
    });

    // Instead of setting startOffset directly, animate a custom property
    const wrapper = { offset: 100 };
    
    tl.to(wrapper, {
        offset: -100,
        duration: 30,
        delay: delay * 0.5,
        ease: "none",
        onUpdate: function() {
            // Update the startOffset attribute manually
            textPath.setAttribute('startOffset', wrapper.offset + '%');
        }
    });

    return tl;
}

function startSquaresAnimation() {
    const animations = ['anim1', 'anim2', 'anim3'];
    activeTimelines = [];

    animations.forEach((animId, index) => {
        const svgObject = document.getElementById(animId);
        
        if (svgObject.contentDocument) {
            const timeline = startAnimation(svgObject.contentDocument, index + 1);
            if (timeline) activeTimelines.push(timeline);
        } else {
            svgObject.addEventListener("load", function() {
                const timeline = startAnimation(this.contentDocument, index + 1);
                if (timeline) activeTimelines.push(timeline);
            });
        }
    });
}

// Initialize animations when page3 is visible
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startSquaresAnimation();
            } else {
                // Stop animations when page is not visible
                activeTimelines.forEach(timeline => timeline.pause());
            }
        });
    }, { threshold: 0.1 });

    const page3 = document.getElementById('page3');
    if (page3) observer.observe(page3);
});


