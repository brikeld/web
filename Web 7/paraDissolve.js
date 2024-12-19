document.addEventListener("DOMContentLoaded", function() {
    const reconstructText = (element, baseDelay = 0) => {
      let text = element.textContent.split("");
      let result = "";
  
      text.forEach(function(char, index) {
        let randomDelay = baseDelay + Math.random(); // Random delay between 0 and 1 second
        result += (char.trim() === "") 
          ? " " 
          : `<span class="char" 
              style="--end-x: 0px; --end-y: 0px; animation-delay: ${randomDelay}s;">
                ${char}
             </span>`;
      });
  
      element.innerHTML = result;
    };
  
    const deconstructText = (element) => {
      const chars = element.querySelectorAll(".char");
  
      chars.forEach((char) => {
        const startPosition = getRandomStartPosition();
        char.style.setProperty("--start-x", `${startPosition.x}px`);
        char.style.setProperty("--start-y", `${startPosition.y}px`);
        char.classList.add("deconstruct");
      });
    };
  
    const getRandomStartPosition = () => {
      const angle = Math.random() * Math.PI * 2; // Random angle
      const distance = 40 + Math.random() * 50; // Random distance off-screen
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };
    };
  
    // Select elements and reconstruct text
    const para1 = document.querySelector(".para");
    const para2 = document.querySelector(".para2");
    reconstructText(para1);
    reconstructText(para2, 1); // Base delay for second paragraph
  
    // Trigger deconstruction after 3 seconds
    setTimeout(() => deconstructText(para1), 3000);
    setTimeout(() => deconstructText(para2), 3000);
  });
  