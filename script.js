// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // ---- Text Content Modification ----
    const dynamicText = document.getElementById('dynamic-text');
    const changeTextBtn = document.getElementById('change-text-btn');
    
    const textOptions = [
        "JavaScript can dynamically change content on a webpage!",
        "This text was modified using the DOM API.",
        "Dynamic content makes websites interactive.",
        "You can update text without reloading the page."
    ];
    
    let textIndex = 0;
    
    changeTextBtn.addEventListener('click', function() {
        textIndex = (textIndex + 1) % textOptions.length;
        dynamicText.textContent = textOptions[textIndex];
    });

    // ---- Style Modification ----
    const styleText = document.getElementById('style-text');
    const changeColorBtn = document.getElementById('change-color-btn');
    const changeSizeBtn = document.getElementById('change-size-btn');
    
    const colors = ['#f0f0f0', '#ffcccc', '#ccffcc', '#ccccff', '#ffffcc'];
    let colorIndex = 0;
    
    changeColorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        styleText.style.backgroundColor = colors[colorIndex];
        styleText.style.padding = '10px';
        styleText.style.borderRadius = '5px';
    });
    
    changeSizeBtn.addEventListener('click', function() {
        // Toggle between normal and large text
        if (styleText.style.fontSize === '1.5em') {
            styleText.style.fontSize = '1em';
            styleText.style.fontWeight = 'normal';
        } else {
            styleText.style.fontSize = '1.5em';
            styleText.style.fontWeight = 'bold';
        }
    });

    // ---- Element Addition/Removal ----
    const elementsContainer = document.getElementById('elements-container');
    const addElementBtn = document.getElementById('add-element-btn');
    const removeElementBtn = document.getElementById('remove-element-btn');
    
    // Create a ul element if it doesn't exist yet
    let listElement = elementsContainer.querySelector('ul');
    if (!listElement) {
        listElement = document.createElement('ul');
        elementsContainer.appendChild(listElement);
    }
    
    // Counter for new items
    let itemCount = 0;
    
    addElementBtn.addEventListener('click', function() {
        itemCount++;
        const newItem = document.createElement('li');
        newItem.textContent = `Item ${itemCount}`;
        newItem.classList.add('list-item');
        
        // Add a highlight effect to new elements
        newItem.classList.add('highlight');
        listElement.appendChild(newItem);
        
        // Remove highlight after a delay
        setTimeout(function() {
            newItem.classList.remove('highlight');
        }, 1000);
    });
    
    removeElementBtn.addEventListener('click', function() {
        const items = listElement.querySelectorAll('li');
        if (items.length > 0) {
            // Remove the last item
            listElement.removeChild(items[items.length - 1]);
        }
    });

    
    
});