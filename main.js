import './style.css';

import header from "./js/compenents/header";

header()

const btn = document.querySelector("button.sidebar-open")
const menu = document.querySelector(".menu-resposive")
const buttonOpen = document.querySelector(".btn-open")
const buttonClose = document.querySelector(".btn-close")

btn.addEventListener("click", () => {
   menu.classList.toggle("hidden")
   formSearch.classList.toggle("hidden", true)
   buttonOpen.classList.toggle("hidden"),
       buttonClose.classList.toggle("hidden")
})

const buttonMenu = document.querySelector("button.search-menu")
const formSearch = document.querySelector(".search-form")

buttonMenu.addEventListener("click", () => {
   formSearch.classList.toggle("hidden")
})

// dropdown toggle

var menu2 = document.getElementById("menu2");
document.getElementById("toggleId").onclick = function() {toggleMenu()};

// open/close the menu when the user clicks on the button
function toggleMenu() {

   console.log("toggleMenu called");
   if (menu2.classList.contains('hidden')) {
      menu2.classList.remove('hidden');
   } else {
      menu2.classList.add('hidden');
   }
}

// close the menu when the user clicks outside of it
window.onclick = function (event) {
   var dropdownWrapper = document.getElementById('dropdown-wrapper');
   if (!dropdownWrapper.contains(event.target) && !menu2.classList.contains('hidden')) {
      menu2.classList.add('hidden');
   }
}