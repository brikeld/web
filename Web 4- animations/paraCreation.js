function getRandomStartPosition() {
    const angle = Math.random() * Math.PI * 2;
    const distance = 5000 + Math.random() * 5000;
    
    return {
        x: Math.cos(angle) * distance + window.innerWidth / 2,
        y: Math.sin(angle) * distance + window.innerHeight / 2
    };
}

function processText(element) {
    const originalTransform = element.style.transform;
    const originalPosition = element.style.position;
    let text = element.innerHTML.replace(/<br>/g, '§'); // Temporarily replace <br> with §
    let characters = text.split('');
    let result = '';
    
    characters.forEach((char, index) => {
        if (char === '§') {
            result += '<br>';
        } else if (char.trim() === '') {
            result += ' ';
        } else {
            const start = getRandomStartPosition();
            const delay = 2 + (Math.random() * 1.5); // 2s initial delay + random 0-1.5s
            result += `<span class="char" 
                style="--start-x: ${start.x}px; 
                       --start-y: ${start.y}px;
                       --end-x: ${index * 0}px;
                       animation-delay: ${delay}s"
                data-original-index="${index}">${char}</span>`;
        }
    });
    
    element.innerHTML = result;
    element.classList.add('ready'); // Add this line to show the text after processing
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        processText(document.getElementById('p3_text3'));
        processText(document.getElementById('p3_text4'));
    }, 2000);
});