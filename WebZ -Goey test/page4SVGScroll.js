function initPage4SVGScroll() {
    const page4 = document.getElementById('page4');
    const container = page4.querySelector('.p4_text-container');
    
    let svgFiles = ['I.svg','01_Pink.svg','A.svg','C_Pink.svg','C_Purple.svg','C-2.svg','C.svg','D.svg','E_Pink.svg','E_Purple.svg','E-2.svg','E.svg','F.svg','I_Pink.svg','I_Purple.svg','I.svg'];
    
    let lastScrollPosition = 0;
    let svgCount = 120;
    const maxSVGs = 550;

    function convertToAscii(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const asciiDiv = document.createElement('pre');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        
        let ascii = '';
        const characters = ' .:-=+*#%@';
        
        for(let y = 0; y < canvas.height; y += 2) {
            for(let x = 0; x < canvas.width; x++) {
                const i = (y * canvas.width + x) * 4;
                const brightness = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
                const character = characters[Math.floor(brightness / 255 * (characters.length - 1))];
                ascii += character;
            }
            ascii += '\n';
        }
        
        asciiDiv.textContent = ascii;
        asciiDiv.style.position = 'absolute';
        asciiDiv.style.left = `${Math.random() * 90}%`;
        asciiDiv.style.top = `${Math.random() * 90}%`;
        asciiDiv.style.transform = `rotate(${Math.random() * 360}deg)`;
        asciiDiv.style.fontSize = '12px'; // Increased from 4px
        asciiDiv.style.lineHeight = '12px'; // Increased from 4px
        asciiDiv.style.color = '#000';
        asciiDiv.style.whiteSpace = 'pre';
        asciiDiv.style.fontFamily = 'HALTimezoneTest, monospace'; // Set the desired font
        asciiDiv.style.transition = 'all 0.3s ease';
        
        return asciiDiv;
    }

    function createRandomSVG() {
        const img = new Image();
        img.onload = () => {
            const asciiArt = convertToAscii(img);
            asciiArt.style.transform = `scale(3) rotate(${Math.random() * 360}deg)`; // Added scale(3)
            asciiArt.style.transformOrigin = 'center center';
            page4.appendChild(asciiArt);
        };
        img.src = `svg/${svgFiles[Math.floor(Math.random() * svgFiles.length)]}`;
    }

    container.addEventListener('scroll', () => {
        const currentScroll = container.scrollTop;
        const maxScroll = container.scrollHeight - container.clientHeight;
        
        if (currentScroll > lastScrollPosition && currentScroll < maxScroll && svgCount < maxSVGs) {
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
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initPage4SVGScroll();
});