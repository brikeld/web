document.addEventListener("DOMContentLoaded", function() {
    const svgObject = document.getElementById("labyrinth-svg");
    svgObject.addEventListener("load", function() {
        const svgDoc = svgObject.contentDocument;
        const textPath = svgDoc.getElementById("labyrinth-text");
        const textPathReverse = svgDoc.getElementById("labyrinth-text-reverse");
        const textPath2 = svgDoc.getElementById("labyrinth-text-2");
        const textPath3 = svgDoc.getElementById("labyrinth-text-3");

        gsap.to(textPath, {
            duration: 500, // Increase the duration to decrease the speed
            attr: { startOffset: "100%" },
            repeat: -1,
            ease: "linear"
        });

        gsap.to(textPathReverse, {
            duration: 500, // Increase the duration to decrease the speed
            attr: { startOffset: "0%" },
            repeat: -1,
            ease: "linear"
        });

        gsap.to(textPath2, {
            duration: 500, // Increase the duration to decrease the speed
            attr: { startOffset: "50%" },
            repeat: -1,
            ease: "linear"
        });

        gsap.to(textPath3, {
            duration: 500, // Increase the duration to decrease the speed
            attr: { startOffset: "50%" },
            repeat: -1,
            ease: "linear"
        });
    });
});