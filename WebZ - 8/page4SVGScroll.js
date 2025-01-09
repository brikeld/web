let overlayTimeout;
let reloadTimeout; // Add this line
let isAtBottom = false; // Track if bottom is reached
let isBackgroundHidden = false; // Track if background has been hidden permanently

function initPage4SVGScroll() {
    const page4 = document.getElementById('page4');
    const container = page4.querySelector('.p4_text-container');
    
    let svgFiles = ['I.svg','01_Pink.svg','A.svg','C_Pink.svg','C_Purple.svg','C-2.svg','C.svg','D.svg','E_Pink.svg','E_Purple.svg','E-2.svg','E.svg','F.svg','I_Pink.svg','I_Purple.svg','I.svg'];
    
    let lastScrollPosition = 0;
    let svgCount = 1;
    const maxSVGs = 1;

    function convertToAscii(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const asciiDiv = document.createElement('pre');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        
        let asciiHTML = '';
        const characters = ' .:-=+*#%@';
        
        for(let y = 0; y < canvas.height; y += 2) {
            for(let x = 0; x < canvas.width; x++) {
                const i = (y * canvas.width + x) * 4;
                const brightness = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
                const character = characters[Math.floor(brightness / 255 * (characters.length - 1))];
                asciiHTML += `<span class="ascii-char">${character}</span>`;
            }
            asciiHTML += '<br>';
        }
        
        asciiDiv.innerHTML = asciiHTML;
        asciiDiv.style.position = 'absolute';
        asciiDiv.style.left = `${Math.random() * -50}%`;
        asciiDiv.style.top = `${Math.random() * 100}%`;
        asciiDiv.style.transform = `rotate(${Math.random() * 360}deg)`;
        asciiDiv.style.fontSize = '100px';
        asciiDiv.style.lineHeight = '100px'; 
        asciiDiv.style.color = '#000';
        asciiDiv.style.whiteSpace = 'pre';
        asciiDiv.style.fontFamily = 'HALTimezoneTest, monospace'; 
        asciiDiv.style.transition = 'all 0.3s ease';
        
        animateAscii(asciiDiv); // Add this line to start animation
        return asciiDiv;
    }

    function animateAscii(asciiDiv) {
        const characters = '@#%&$*+=-:.';
        const asciiChars = asciiDiv.querySelectorAll('.ascii-char');
        
        setInterval(() => {
            asciiChars.forEach(charSpan => {
                charSpan.textContent = characters[Math.floor(Math.random() * characters.length)];
            });
        }, 500); 
        
        // Add pulsing scale animation
        gsap.to(asciiDiv, {
            scale: 1.1,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }

    function createRandomSVG() {
        const img = new Image();
        img.onload = () => {
            const asciiArt = convertToAscii(img);
            asciiArt.style.transform = `scale(1.5) rotate(${Math.random() * 360}deg)`;
            asciiArt.style.transformOrigin = 'center center';
            page4.appendChild(asciiArt);
            
            // Remove the following line
            // console.log(`SVG Count: ${svgCount}`);
        };
        img.src = `svg/${svgFiles[Math.floor(Math.random() * svgFiles.length)]}`;
    }

    container.addEventListener('scroll', () => {
        const currentScroll = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        
        // Check if bottom is reached
        if (currentScroll >= maxScroll - 10) { // 10px threshold
            if (!isAtBottom) {
                isAtBottom = true;
                
                // Hide the background of #p4_overlay-text permanently
                const overlayText = document.getElementById('p4_overlay-text');
                if (overlayText && !isBackgroundHidden) {
                    overlayText.style.background = 'none';
                    isBackgroundHidden = true; // Ensure this runs only once
                    // Remove the following line
                    // console.log('Background of #p4_overlay-text has been hidden permanently.');
                }

                // Start reload timer
                reloadTimeout = setTimeout(() => {
                    location.reload();
                }, 3000); // 3 seconds
            }
        } else {
            if (isAtBottom) {
                isAtBottom = false;
                // Clear reload timer if user scrolls up before 3 seconds
                clearTimeout(reloadTimeout);
            }
        }

        if (currentScroll > lastScrollPosition && !isAtBottom && svgCount < maxSVGs) {
            const numToAdd = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < numToAdd; i++) {
                if (svgCount < maxSVGs) {
                    createRandomSVG();
                    svgCount++;
                }
            }
        }

        // Background color transition
        const scrollRatio = currentScroll / maxScroll;
        const inverted = 255 - Math.floor(scrollRatio * 255);
        page4.style.backgroundColor = `rgb(${inverted}, ${inverted}, ${inverted})`;

        lastScrollPosition = currentScroll;

        const overlayText = document.getElementById('p4_overlay-text');
        if (overlayText && !isBackgroundHidden) {
            // Show overlay when scrolling starts
            overlayText.style.display = 'block';

            // Clear any existing timeout
            clearTimeout(overlayTimeout);

            // Set timeout to hide overlay after 2 seconds
            overlayTimeout = setTimeout(() => {
                overlayText.style.display = 'none';
            }, 2000);
        }
    });

    // Add IntersectionObserver for the button
    const page4Button = document.getElementById('page4_button');
    if (page4Button) {
        const buttonObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stop SVG animations
                    activeTimelines.forEach(timeline => timeline.kill());
                } else {
                    // Start SVG animations
                    startSquaresAnimation();
                }
            });
        }, { threshold: 0.5 }); // Adjust threshold as needed

        buttonObserver.observe(page4Button);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initPage4SVGScroll();

    const page4 = document.getElementById('page4');
    const svgElement = page4.querySelector('svg'); // Adjust the selector if necessary

    if (svgElement) {
        const letters = svgElement.querySelectorAll('.letter'); // Ensure each letter has the class 'letter'

        const shuffleLetters = () => {
            const letterArray = Array.from(letters);
            const shuffled = letterArray.sort(() => Math.random() - 0.5);
            letterArray.forEach((letter, index) => {
                letter.style.order = shuffled.indexOf(letter);
            });
        };

        const resetOrder = () => {
            letters.forEach((letter, index) => {
                letter.style.order = index;
            });
        };

        // Apply Flexbox to SVG text for ordering
        const textElement = svgElement.querySelector('text'); // Adjust selector if needed
        if (textElement) {
            textElement.style.display = 'flex';
            textElement.style.flexDirection = 'row';
        }

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Briefly shuffle letters
                    shuffleLetters();
                    shuffleLetters();
                    setTimeout(() => {
                        resetOrder();
                    }, 1000); // Duration of the animation in milliseconds

                    // Optionally, unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5 // Adjust as needed
        });

        observer.observe(page4);
    }
});