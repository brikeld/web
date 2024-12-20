    // Scroll morphing text 
    function calculateScrollFraction() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return scrollTop / scrollHeight;
    }

    function doMorph(scrollFraction) {
        let fraction = Math.min(scrollFraction, 1);
        setMorph(fraction);
    }

    function setMorph(fraction) {
        // Apply blur and opacity as before
        elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px) url(#gooey)`;
        elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 1000}%`;
    
        fraction = 1 - fraction;
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px) url(#gooey)`;
        elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    }
    

    window.addEventListener('scroll', () => {
        const scrollFraction = calculateScrollFraction();
        doMorph(scrollFraction);
    });

    const initialScrollFraction = calculateScrollFraction();
    doMorph(initialScrollFraction);
