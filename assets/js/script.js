
// for mobile menu of navbar
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click',() => {
  navbarMenu.classList.toggle('is-active');
}
);


//modal functions
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    //Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });
  //end of modal functions

//getting modal data for food. adds or subtracts from an array when checkbox is checked
let foodCheckBoxes = document.querySelectorAll('.food');
let foodListArray = [];

for(var checkbox of foodCheckBoxes) {
  checkbox.addEventListener('change' ,function(e){
    if(this.checked == true) {
      foodListArray.push(this.value);
    } else {
      foodListArray = foodListArray.filter(e => e !== this.value);

    }
    console.log(foodListArray)
  })
}
//end of modal data for food

//getting modal data for drink. adds or subtracts from an array when checkbox is checked
let drinkCheckBoxes = document.querySelectorAll('.drink');
let drinkListArray = [];

for(var checkbox of drinkCheckBoxes) {
  checkbox.addEventListener('change' ,function(e){
    if(this.checked == true) {
      drinkListArray.push(this.value);
    } else {
      drinkListArray = drinkListArray.filter(e => e !== this.value);

    }
    console.log(drinkListArray)
  })
}
//end of modal data for drink

//figuring out fetch requests.
var randomFoodEL = document.getElementById('random-food-btn');
var randomDrinkEL = document.getElementById('random-drink-btn');
var userFoodEL = document.getElementById('user-food-btn');
var userDrinkEL = document.getElementById('user-drink-btn');
var drinkRecipe = document.getElementById('drink-content')
var foodRecipe = document.getElementById('food-content')
var recipeTitle = document.getElementById('recipe-title')
var foodInstructions = document.getElementById('food-instructions')
var foodImg = document.getElementById('food-img')
var foodIngredients = document.getElementById('food-ingredients')
let ingredients = [];

var foodApi = 'https://api.spoonacular.com/recipes/random?apiKey=e3e8dd67fa0a45c5b197633ec21de3a9'

//appending to drink-recipe-content and food-recipe-content

async function getRandomFoodRecipe() {
  const recipe = await fetch(foodApi)
  .then((response) => response.json()) 
  .then((data) => {
    console.log(data) 
    data.recipes[0].extendedIngredients.forEach(ingredient => {
      ingredients.push(ingredient.original)  
    });
    recipeTitle.innerHTML = data.recipes[0].title
    foodInstructions.innerHTML = data.recipes[0].instructions
    foodImg.src = data.recipes[0].image
    console.log(ingredients)
    var ulEl = "<ul>"
    ingredients.forEach(ingredient => {
      ulEl += "<li>" + ingredient + "</li>" 
    })
    ulEl += "</ul>"
    foodIngredients.innerHTML = ulEl
}) .catch(error => {
    console.log(error)
  });
}
randomFoodEL.addEventListener('click', getRandomFoodRecipe);

// getting a completely random drink recipe from api
function getRandomDrinkRecipe() {
  fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php?')
  .then((response) => response.json())
  .then((data) => console.log(data));
}

randomDrinkEL.addEventListener('click', getRandomDrinkRecipe);