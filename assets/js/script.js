
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
var foodApi = 'https://api.spoonacular.com/recipes/random?apiKey=e3e8dd67fa0a45c5b197633ec21de3a9'
var drinkApi = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
var ingredOne = document.getElementById('ingredientOne')
var ingredTwo = document.getElementById('ingredientTwo')
var ingredThree = document.getElementById('ingredientThree')
var ingredFour = document.getElementById('ingredientFour')
var ingredFive = document.getElementById('ingredientFive')
var ingredSix = document.getElementById('ingredientSix')
var ingredSeven = document.getElementById('ingredientSeven')
var ingredEight = document.getElementById('ingredientEight')
var ingredNine = document.getElementById('ingredientNine')
var ingredTen = document.getElementById('ingredientTen')
var ingredEleven = document.getElementById('ingredientEleven')
var ingredTwelve = document.getElementById('ingredientTwelve')
var ingredThirteen = document.getElementById('ingredientThirteen')
var ingredFourteen = document.getElementById('ingredientFourteen')
var ingredFifteen = document.getElementById('ingredientFifteen')

//Fetch data from food api and generate completely random recipe. use innerHTML to add recipe to recipe tile on page
async function getRandomFoodRecipe() {
  const recipe = await fetch(foodApi)
  .then((response) => response.json()) 
  .then((data) => {
    console.log(data)
    let ingredients = [];
    ingredients = [];
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
    console.log(data)
    let ingredients = [];
    ingredients = [];
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
userFoodEL.addEventListener('click', getUserFoodRecipe);

// getting a completely random drink recipe from api
// still need to get -> data.drinks[0].strIngredient 1-15,strMeasure 1-15 
// and set into ul with id "drink-ingredients"



async function getRandomDrinkRecipe() {
  const recipe = await fetch(drinkApi)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    drinkTitle.innerHTML = data.drinks[0].strDrink
    drinkInstructions.innerHTML = data.drinks[0].strInstructions
    DrinkImg.src = data.drinks[0].strDrinkThumb
    
    ingredOne.innerText = data.drinks[0].strMeasure1 + data.drinks[0].strIngredient1
    ingredTwo.innerText = data.drinks[0].strMeasure2 + data.drinks[0].strIngredient2
    ingredThree.innerText = data.drinks[0].strMeasure3 + data.drinks[0].strIngredient3
    ingredFour.innerText = data.drinks[0].strMeasure4 + data.drinks[0].strIngredient4
    ingredFive.innerText = data.drinks[0].strMeasure5 + data.drinks[0].strIngredient5
    ingredSix.innerText = data.drinks[0].strMeasure6 + data.drinks[0].strIngredient6
    ingredSeven.innerText = data.drinks[0].strMeasure7 + data.drinks[0].strIngredient7
    ingredEight.innerText = data.drinks[0].strMeasure8 + data.drinks[0].strIngredient8
    ingredNine.innerText = data.drinks[0].strMeasure9 + data.drinks[0].strIngredient9
    ingredTen.innerText = data.drinks[0].strMeasure10 + data.drinks[0].strIngredient10
    ingredEleven.innerText = data.drinks[0].strMeasure11 + data.drinks[0].strIngredient11
    ingredTwelve.innerText = data.drinks[0].strMeasure12 + data.drinks[0].strIngredient12
    ingredThirteen.innerText = data.drinks[0].strMeasure13 + data.drinks[0].strIngredient13
    ingredFourteen.innerText = data.drinks[0].strMeasure14 + data.drinks[0].strIngredient14
    ingredFifteen.innerText = data.drinks[0].strMeasure15 + data.drinks[0].strIngredient15
    

}) .catch(error => {
    console.log(error)
  });
}
randomDrinkEL.addEventListener('click', getRandomDrinkRecipe);
