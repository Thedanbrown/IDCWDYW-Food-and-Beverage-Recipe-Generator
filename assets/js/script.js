
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
//getting modal data for food. adds or subtracts from an array when checkbox is checked
let foodCheckBoxes = document.querySelectorAll('.food');
let foodListArray = [];
let foodListString = '';

for(var checkbox of foodCheckBoxes) {
  checkbox.addEventListener('change' ,function(e){
    if(this.checked == true) {
      foodListArray.push(this.value);
}
  else {
      foodListArray = foodListArray.filter(e => e !== this.value);
}
  console.log(foodListString)
  })
}
//end of modal data for food

//Setting all Variables
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
var drinkTitle = document.getElementById('drink-recipe-title')
var drinkInstructions = document.getElementById('drink-instructions')
var DrinkImg = document.getElementById('drink-img')
var recentRecipe = document.querySelector('navbar-item-2')
var recentlyUsedRep = document.getElementById('recently-used-recp')
var foodApi = 'https://api.spoonacular.com/recipes/random?apiKey=e3e8dd67fa0a45c5b197633ec21de3a9'
var drinkApi = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

//Fetch data from food api and generate completely random recipe. use innerHTML to add recipe to recipe tile on page
async function getRandomFoodRecipe() {
  const recipe = await fetch(foodApi)
  .then((response) => response.json()) 
  .then((data) => {
    let ingredients = [];
    ingredients = [];
    data.recipes[0].extendedIngredients.forEach(ingredient => {
      ingredients.push(ingredient.original)  
    });
    recipeTitle.innerHTML = data.recipes[0].title
    foodInstructions.innerHTML = data.recipes[0].instructions
    foodImg.src = data.recipes[0].image
    var ulEl = "<ul>"
    ingredients.forEach(ingredient => {
      ulEl += "<li>" + ingredient + "</li>" 
    })
    ulEl += "</ul>"
    foodIngredients.innerHTML = ulEl
 //Sets link to source recipe url to save in local storage
    localStorage.setItem('sourceUrl', JSON.stringify(data.recipes[0].spoonacularSourceUrl));
    recentRecipes();
}) .catch(error => {
    console.log(error)
  });
}

//Fetch data from food api and generate recipe using some user criteria. use innerHTML to add recipe to recipe tile on page
async function getUserFoodRecipe() {
  foodListString = '';
  for(let i = 0; i < foodListArray.length; i++) {
    foodListString += foodListArray[i] + ','
  }
console.log(foodListString);
  var userFoodApi = foodApi + '&number=1&tags=' + foodListString
const recipe = await fetch(userFoodApi)//add user criteria to fetch request
  .then((response) => response.json())
  .then((data) => {
    let ingredients = [];
    ingredients = [];
    data.recipes[0].extendedIngredients.forEach(ingredient => {
      ingredients.push(ingredient.original)  
    });
    recipeTitle.innerHTML = data.recipes[0].title
    foodInstructions.innerHTML = data.recipes[0].instructions
    foodImg.src = data.recipes[0].image
    var ulEl = "<ul>"
    ingredients.forEach(ingredient => {
      ulEl += "<li>" + ingredient + "</li>" 
    })
    ulEl += "</ul>"
    foodIngredients.innerHTML = ulEl
    //Sets link to source recipe url to save in local storage
    localStorage.setItem('sourceUrl', JSON.stringify(data.recipes[0].spoonacularSourceUrl));
    recentRecipes();
}) .catch(error => {
    console.log(error)
  });
}

function recentRecipes() {
  var recipeUrl = localStorage.getItem('sourceUrl');
  var parseUrl = JSON.parse(recipeUrl);
  var recipeLink = document.createElement('a');
  recipeLink.setAttribute('href', parseUrl);
  recipeLink.innerText = parseUrl;
  recentlyUsedRep.appendChild(recipeLink);
}

// getting a completely random drink recipe from api
async function getRandomDrinkRecipe() {
  const recipe = await fetch(drinkApi)
  .then((response) => response.json())
  .then((data) => {
    drinkTitle.innerHTML = data.drinks[0].strDrink
    drinkInstructions.innerHTML = data.drinks[0].strInstructions
    DrinkImg.src = data.drinks[0].strDrinkThumb
    console.log(Object.entries(data.drinks[0]))
    var values = Object.entries(data.drinks[0]).filter(function(item) {
        return item[0].includes('Ingredient') && item[1] != null
    })
    var recipeItem = document.querySelector('#drinkIng')
    values.forEach(function(item, index) {
      var num = item[0].substring(13)
      var listItemContent = `${data.drinks[0]['strMeasure' + num]} ${item[1]}`
      var listItem = document.createElement('li')
      listItem.innerText = listItemContent
      recipeItem.appendChild(listItem);
    })
}) .catch(error => {
    console.log(error)
  });
}
randomFoodEL.addEventListener('click', getRandomFoodRecipe);
userFoodEL.addEventListener('click', getUserFoodRecipe);
randomDrinkEL.addEventListener('click', getRandomDrinkRecipe);

recentRecipes();
