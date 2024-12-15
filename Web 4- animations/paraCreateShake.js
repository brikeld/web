function getRandomStartPosition() {
    // Random angle in radians
    const angle = Math.random() * Math.PI * 2;
    // Random distance from center (1000-2000px to ensure it's off-screen)
    const distance = 1000 + Math.random() * 1000;
    
    return {
      x: Math.cos(angle) * distance + window.innerWidth / 2,
      y: Math.sin(angle) * distance + window.innerHeight / 2
    };
  }
  
  function processText(element) {
    let text = element.textContent.split("");
    let result = "";
    
    text.forEach((char, index) => {
      if (char.trim() === "") {
        result += " ";
      } else {
        const start = getRandomStartPosition();
        // Random animation delay between 0 and 2 seconds
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
  
  processText(document.querySelector(".para"));
  