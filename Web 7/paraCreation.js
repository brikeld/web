// Encapsulate the existing code into a function
function startParaCreation() {
    const textConfigs = {
        p3_text1: { // Configuration for p3_text1
            baseDelay: 0.02,
            randomDelay: 0.3,
            animationDuration: 2.0,
            distance: 5
        },
        p3_text2: { // Configuration for p3_text2
            baseDelay: 0.02,
            randomDelay: 0.3,
            animationDuration: 2.5,
            distance: 5
        },
        p3_text3: {//paragraph rotated at the left
            baseDelay: .01,
            randomDelay: 0.8,
            animationDuration: 2.5,
            distance: 50
        },
        p3_text4: { //paragraph rotated at the right
            baseDelay: 0.01,
            randomDelay: 0.8,
            animationDuration: 3.9,
            distance: 5
        },
        p3_text5: {
            baseDelay: 0.05,
            randomDelay: 0.2,
            animationDuration: 4.2,
            distance: 5
        },
        p3_text6: {
            baseDelay: 0.05,
            randomDelay: 0.2,
            animationDuration: 5.2,
            distance: 10
        },
        p3_text7: {
            baseDelay: 0.08,
            randomDelay: 0.3,
            animationDuration: 3.7,
            distance: 10
        },
        p3_text8: {
            baseDelay: 0.03,
            randomDelay: 0.4,
            animationDuration: 4,
            distance: 10
        }
    };
    
    function getRandomStartPosition(distance) {
        const angle = Math.random() * Math.PI * 2;
        const randomDistance = distance + Math.random() * distance/2;
        
        return {
            x: Math.cos(angle) * randomDistance + window.innerWidth / 2,
            y: Math.sin(angle) * randomDistance + window.innerHeight / 2
        };
    }
    
    function processText(element) {
        if (!element) {
            return;
        }
        
        const config = textConfigs[element.id] || textConfigs.default;
    
        let text = element.innerText;
        let characters = text.split('');
        let result = '';
        
        characters.forEach((char, index) => {
            if (char === '\n') {
                result += '<br>';
            } else if (char.trim() === '') {
                result += ' ';
            } else {
                const start = getRandomStartPosition(config.distance);
                const delay = (index * config.baseDelay) + (Math.random() * config.randomDelay);
                result += `<span class="char" 
                    style="--start-x: ${start.x}px; 
                           --start-y: ${start.y}px;
                           animation-delay: ${delay}s;
                           animation-duration: ${config.animationDuration}s">${char}</span>`;
            }
        });
        
        element.innerHTML = result;
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.classList.add('ready');

        // Add event listener for animation end
        const chars = element.querySelectorAll('.char');
        chars.forEach(char => {
            char.addEventListener('animationend', () => {
            });
        });
    }

    // Execute the text processing
    const elements = [
        document.getElementById('p3_text1'), 
        document.getElementById('p3_text2'), 
        document.getElementById('p3_text3'),
        document.getElementById('p3_text4'),
        document.getElementById('p3_text5'),
        document.getElementById('p3_text6'),
        document.getElementById('p3_text7'),
        document.getElementById('p3_text8')
    ];
    
    elements.forEach(element => {
        if (element) processText(element);
    });

    // Add the function to the global scope
    window.startParaCreation = startParaCreation;
}

function reverseParaCreation() {
    const elements = [
        document.getElementById('p3_text1'),
        document.getElementById('p3_text2'),
        document.getElementById('p3_text3'),
        document.getElementById('p3_text4'),
        document.getElementById('p3_text5'),
        document.getElementById('p3_text6'),
        document.getElementById('p3_text7'),
        document.getElementById('p3_text8')
    ];

    elements.forEach(element => {
        if (element) {
            const chars = element.querySelectorAll('.char');
            chars.forEach(char => {
                char.classList.remove('char');
                char.classList.add('char-reverse'); // This triggers the reverse animation
            });
        }
    });
}