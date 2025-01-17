function modifyDivClasses() {
    // Select all divs with the class 'einvLd'
    const divs = document.querySelectorAll("div:has(> div[aria-label='Gemini'])");
    
    divs.forEach(div => {
        div.style.display = "none"; // Hide the div
        console.log("Modified div:", div);
    });
}

window.addEventListener("load", () => {
    console.log("Page fully loaded");

    // Run initial modifications
    modifyDivClasses();

    // Set up observer for dynamically added content
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.matches && node.matches("div.einvLd")) {
                    node.style.display = "none"; // Hide dynamically added divs
                    console.log("Dynamically modified div:", node);
                }
            });
        });
    });

    // Observe changes to the DOM
    observer.observe(document.body, { childList: true, subtree: true });
});
