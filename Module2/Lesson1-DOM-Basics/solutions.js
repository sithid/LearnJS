// Exercise 1: Element Selection
function testSelectors() {
    // 1. Select the element with ID 'selection-practice'
    const idElement = document.getElementById('selection-practice');
    
    // 2. Select all elements with class 'item'
    const classElements = document.getElementsByClassName('item');
    
    // 3. Select all paragraph elements
    const tagElements = document.getElementsByTagName('p');
    
    // 4. Select the element with both classes 'item' and 'special'
    const specialElement = document.querySelector('.item.special');
    
    // Log results
    console.log('ID Selection:', idElement);
    console.log('Class Selection:', classElements);
    console.log('Tag Selection:', tagElements);
    console.log('Complex Selection:', specialElement);

    // Highlight selected elements
    Array.from(classElements).forEach(element => {
        element.style.backgroundColor = '#e0e0e0';
    });
    if (specialElement) {
        specialElement.style.backgroundColor = 'yellow';
    }
}

// Exercise 2: Content Manipulation
function testContentManipulation() {
    // 1. Change the text content
    const textElement = document.getElementById('text-content');
    textElement.textContent = 'Text content has been changed!';
    
    // 2. Change the HTML content
    const htmlElement = document.getElementById('html-content');
    htmlElement.innerHTML = '<strong>HTML</strong> content has been <em>changed</em>!';
    
    // 3. Modify attributes
    const attributeElement = document.getElementById('attribute-practice');
    attributeElement.setAttribute('data-test', 'modified');
    attributeElement.setAttribute('title', 'Modified element');
    
    // 4. Toggle class
    attributeElement.classList.toggle('highlight');
}

// Exercise 3: DOM Creation
function testDOMCreation() {
    const container = document.getElementById('element-container');
    
    // 1 & 2. Create and add content to new element
    const newDiv = document.createElement('div');
    newDiv.textContent = 'Newly created element';
    newDiv.classList.add('item');
    
    // 3. Add to container
    container.appendChild(newDiv);
    
    // 4. Create multiple elements
    for (let i = 1; i <= 3; i++) {
        const element = document.createElement('p');
        element.textContent = `Dynamic element ${i}`;
        element.classList.add('item');
        container.appendChild(element);
    }
    
    // 5. Remove after delay
    setTimeout(() => {
        if (newDiv.parentNode) {
            newDiv.remove();
        }
    }, 2000);
}

// Exercise 4: Style Manipulation
function testStyleManipulation() {
    const target = document.getElementById('style-target');
    
    // 1. Change color
    target.style.color = 'blue';
    
    // 2. Modify dimensions
    target.style.width = '200px';
    target.style.height = '100px';
    
    // 3. Multiple styles
    Object.assign(target.style, {
        backgroundColor: '#f0f0f0',
        border: '2px solid blue',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px'
    });
    
    // 4. Toggle visibility
    setTimeout(() => {
        target.style.visibility = 'hidden';
        setTimeout(() => {
            target.style.visibility = 'visible';
        }, 1000);
    }, 2000);
}

// Exercise 5: Dynamic List
let items = [];

function addItem() {
    const input = document.getElementById('item-input');
    const value = input.value.trim();
    
    if (value) {
        // Add to array
        items.push(value);
        
        // Clear input
        input.value = '';
        
        // Update display
        updateDisplay();
    }
}

function removeItem(index) {
    // Remove from array
    items.splice(index, 1);
    
    // Update display
    updateDisplay();
}

function sortItems() {
    // Sort array
    items.sort((a, b) => a.localeCompare(b));
    
    // Update display
    updateDisplay();
}

function updateDisplay() {
    const list = document.getElementById('dynamic-list');
    
    // Clear current list
    list.innerHTML = '';
    
    // Create new items
    items.forEach((item, index) => {
        const li = document.createElement('li');
        
        // Add item text
        const text = document.createElement('span');
        text.textContent = item;
        li.appendChild(text);
        
        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => removeItem(index);
        li.appendChild(deleteBtn);
        
        // Add to list
        list.appendChild(li);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Solutions loaded!');
    // Add any initialization here
}); 