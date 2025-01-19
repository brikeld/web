function handleStickyElement(elementId, scrollThreshold, travelDistance, positionOnPage) {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }

    // Save the initial position of the element
    const initialTop = parseFloat(window.getComputedStyle(element).top) || 0;
    let isSticky = false;

    document.addEventListener("scroll", () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        console.log(scrollY+"scroll");

        if (!isSticky && scrollY >= scrollThreshold) {
            console.log("fixed")
            // Enter sticky mode
            element.style.position = "fixed";
            element.style.top = `${positionOnPage}px`;
            isSticky = true;
        } else if (isSticky && scrollY >= scrollThreshold + travelDistance) {
            console.log("back")
            // Exit sticky mode and restore to absolute positioning
            element.style.position = "absolute";
            element.style.top = `${initialTop + travelDistance}px`;
            isSticky = false;
        }
    });
}

handleStickyElement("exit-text2", 300, 500, 20);