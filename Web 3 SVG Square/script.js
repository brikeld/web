document.addEventListener("DOMContentLoaded", function() {
    const squares = ['square-01', 'square-02', 'square-03'];
    const initialTexts = [
        document.getElementById('text-line-1'),
        document.getElementById('text-line-2'),
        document.getElementById('text-line-3')
    ];

    setTimeout(() => {
        squares.forEach((squareId, index) => {
            const svgObject = document.getElementById(squareId);
            const initialText = initialTexts[index];

            if (svgObject.contentDocument) {
                startAnimation(svgObject.contentDocument, initialText, index + 1);
            } else {
                svgObject.addEventListener("load", function() {
                    startAnimation(svgObject.contentDocument, initialText, index + 1);
                });
            }
        });

        // Reveal the shapes after the text animations complete
        gsap.to('.squares-container', {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
            delay: 3.5 // Adjust delay to match text animation
        });
    }, 3000);

    function startAnimation(svgDoc, initialText, index) {
        const textPath = svgDoc.getElementById(`text-path-${index}`);
        
        // Master timeline
        const masterTimeline = gsap.timeline({
            defaults: { ease: "power2.inOut" }
        });

        // 1. Move initial text down smoothly
        masterTimeline.to(initialText, {
            y: '70vh',
            duration: 2,
            ease: "power2.out"
        })
        // 2. Fade out initial text while continuing downward
        .to(initialText, {
            opacity: 0,
            y: '100vh',
            duration: 1,
            ease: "power2.in"
        }, "-=0.5")
        // 3. Start the path animation after shapes are revealed
        .add(() => {
            // Create a timeline for the continuous rotation
            const rotationTimeline = gsap.timeline({
                repeat: -1,
                defaults: { ease: "none" }
            });

            // Set initial state
            gsap.set(textPath, {
                attr: { startOffset: "100%" },
                opacity: 0
            });

            // Fade in and start moving
            rotationTimeline
                .to(textPath, {
                    opacity: 1,
                    duration: 1
                })
                .to(textPath, {
                    attr: { startOffset: "-100%" },
                    duration: 40,
                    ease: "none"
                }, "-=1");

            return rotationTimeline;
        }, "+=0.5"); // Slight delay to sync with shapes reveal
    }
});