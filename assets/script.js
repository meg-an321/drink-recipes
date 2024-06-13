// Initialize an array to store the drinks
let drinks = JSON.parse(localStorage.getItem('drinks')) || [];

// fetch code in a function
function fetchAndDisplayDrink() {
    // Fetch a random alcoholic drink
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const randomDrink = data.drinks[0];
            if (randomDrink.strAlcoholic !== 'Alcoholic') {
                // If the drink is not alcoholic, fetch again
                fetchAlcoholicDrink();
            } else {
                // Process the alcoholic drink
                console.log(randomDrink);
            }

            // Save the random drink data to the drinks array and local storage
            drinks.push(randomDrink);
            localStorage.setItem('drinks', JSON.stringify(drinks));

            // Display the drink details
            displayDrinkDetails(randomDrink);
        })
        .catch(error => console.error('Error:', error));
}

// Function to display the drink details
function displayDrinkDetails(randomDrink) {
    // Create elements to display the drink information
    const cardEl = document.createElement('main');
    const drinkEl = document.createElement('div');
    const nameEl = document.createElement('h2');
    const imgEl = document.createElement('img');
    const ingredientsEl = document.createElement('ul');
    const measurementsEl = document.createElement('ul');
    const instructionsEl = document.createElement('p');
    const deleteButton = document.createElement('button');

    // Create an icon element
    const iconEl = document.createElement('i');
    iconEl.className = 'fa-solid fa-trash-can';

    // Append the icon to the delete button
    deleteButton.appendChild(iconEl);

    // Set the classes for the elements
    cardEl.className = 'col-4 mx-auto';
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger mb-5';

    // Set the text of the delete button
    deleteButton.appendChild;


    // Set the content of the elements
    nameEl.textContent = randomDrink.strDrink;
    imgEl.src = randomDrink.strDrinkThumb;
    imgEl.classList.add('drink-image');
    instructionsEl.textContent = randomDrink.strInstructions;
    deleteButton.addEventListener('click', () => {
        // Remove the drink from the drinks array and local storage
        drinks = drinks.filter(drink => drink.idDrink !== randomDrink.idDrink);
        localStorage.setItem('drinks', JSON.stringify(drinks));

        // Remove the card element from the display
        cardEl.remove();
    });

    // Loop through the ingredients and measurements and append them
    for (let i = 1; i <= 15; i++) {
        const ingredient = randomDrink['strIngredient' + i];
        const measurement = randomDrink['strMeasure' + i];

        if (ingredient || measurement) {
            const li = document.createElement('li');
            li.style.listStyleType = 'none';
            li.textContent = `${measurement ? measurement : ''} ${ingredient ? ingredient : ''}`.trim();
            ingredientsEl.appendChild(li);
        }
    }

    // Append the elements to the drink element
    drinkEl.appendChild(nameEl);
    drinkEl.appendChild(imgEl);
    drinkEl.appendChild(ingredientsEl);
    drinkEl.appendChild(measurementsEl);
    drinkEl.appendChild(instructionsEl);
    drinkEl.appendChild(deleteButton);

    // Append the drink element to the card element
    cardEl.appendChild(drinkEl);

    // Get the container element
    const container = document.querySelector('#drinkContainer');

    // Clear the container and append the card element
    container.prepend(cardEl);
}

// When the page loads, check if there are any saved drinks
window.addEventListener('load', () => {
    if (drinks.length > 0) {
        // If there are saved drinks, display each one
        drinks.forEach(drink => displayDrinkDetails(drink));
    }
});

// Get the generate button and add a click event listener
const generateButton = document.querySelector('#generateButton');
generateButton.addEventListener('click', () => {
    fetchAndDisplayDrink();

    // Get the modal element
    const modalEl = document.querySelector('#exampleModal');

    // Trigger the 'hide' event on the modal element
    var bootstrapModal = bootstrap.Modal.getInstance(modalEl);
    bootstrapModal.hide();
});

