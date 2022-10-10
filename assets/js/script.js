
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
