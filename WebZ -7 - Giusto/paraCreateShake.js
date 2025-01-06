function getRandomStartPosition() {
    const angle = Math.random() * Math.PI * 2;
    const distance = 1000 + Math.random() * 1000;
    
    return {
      x: Math.cos(angle) * distance + window.innerWidth / 2,
      y: Math.sin(angle) * distance + window.innerHeight / 2
    };
}
  
function processText(element) {
    if (!element) return;
    
    let text = element.textContent.split("");
    let result = "";
    
    text.forEach((char, index) => {
        if (char === '\n') {
            result += '<br>';
        } else if (char.trim() === "") {
            result += " ";
        } else {
            const start = getRandomStartPosition();
            const delay = Math.random() * 1;
            result += `<span class="char" 
                style="--start-x: ${start.x}px; 
                       --start-y: ${start.y}px;
                       --end-x: ${index * 1}px;
                       animation-delay: ${delay}s"
                data-original-index="${index}">${char}</span>`;
        }
    });
    
    element.innerHTML = result;
}

document.addEventListener('DOMContentLoaded', () => {
    document.fonts.ready.then(() => {
        setTimeout(() => {
            const textElements = [
            ];
            
            textElements.forEach(element => processText(element));
        }, 2000);
    });
});
