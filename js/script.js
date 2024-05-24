// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

CShamburgerMenu.addEventListener('click', function() {
	CShamburgerMenu.classList.toggle("cs-active");
	CSnavbarMenu.classList.toggle("cs-active");
	CSbody.classList.toggle("cs-open");
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
function ariaExpanded() {
	const csUL = document.querySelector('#cs-expanded');
	const csExpanded = csUL.getAttribute('aria-expanded');

	if (csExpanded === 'false') {
		csUL.setAttribute('aria-expanded', 'true');
	} else {
		csUL.setAttribute('aria-expanded', 'false');
	}
}

// This script adds a class to the body after scrolling 100px
// and we used these body.scroll styles to create some on scroll 
// animations with the navbar

document.addEventListener('scroll', (e) => { 
	const scroll = document.documentElement.scrollTop;
	if(scroll >= 100){
		document.querySelector('body').classList.add('scroll')
	} else {
		document.querySelector('body').classList.remove('scroll')
	}


});

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
	for (const item of dropDowns) {
		const onClick = () => {
		item.classList.toggle('cs-active')
	}
	item.addEventListener('click', onClick)
	}
												
// Shopping cart 

const shoppingList = document.querySelector(".shopping-cart");
const allShoppingListItems = shoppingList.querySelectorAll("li");
const addToCartButtons = document.querySelectorAll(".cs-tr button");

addToCartButtons.forEach((button) => {
	button.addEventListener("click", () => {
		addToCart(button); 
	});

})


function addToCart(button){
	const row = button.closest(".cs-tr");
	let priceString = row.querySelector(".price").textContent;
	let newItemNameString = row.querySelector(".service").textContent;

	// Add quantity instead of adding new item if already in list
	if(isInList(newItemNameString)){
		incrementQuantity(newItemNameString);
		updateCartTotal();
		return;
	}



	// Create shopping list item
	const item = document.createElement("li"); 
	const priceDiv = document.createElement("div");
	const nameDiv = document.createElement("div");
	const quantityDiv = document.createElement("div");
	const removeButton = document.createElement("button");

	item.classList.add("cart-rows");

	priceDiv.classList.add("price");
	priceDiv.classList.add("column");

	nameDiv.classList.add("name");
	nameDiv.classList.add("column");

	quantityDiv.classList.add("quantity");
	quantityDiv.classList.add("column");


	item.appendChild(nameDiv);
	item.appendChild(priceDiv);
	item.appendChild(quantityDiv);
	item.appendChild(removeButton);

	// Get relevent price and name
	nameDiv.textContent = newItemNameString;
	priceDiv.textContent = priceString;
	quantityDiv.textContent = "1";

	removeButton.textContent = "Remove";
	removeButton.addEventListener("click", () => {
		shoppingList.removeChild(item);
		updateCartTotal();
	})

	shoppingList.appendChild(item);
	updateCartTotal();

}

function incrementQuantity(name){
	let allItems = shoppingList.querySelectorAll("li");

	//get relevent item
	allItems.forEach((element => {
		let itemName = element.querySelector(".name").textContent;
		if(itemName === name){
			let itemQuantityString = element.querySelector(".quantity").textContent;
			let itemQuantity = Number(itemQuantityString);
			itemQuantity++;

			let itemQuantityDiv = element.querySelector(".quantity");
			itemQuantityDiv.textContent = itemQuantity;
		}
	}))
	
}

function isInList(name){
	// get shopping list and check against name
	let allItems = shoppingList.querySelectorAll("li");

	for (const item of allItems) {
		let itemName = item.querySelector(".name").textContent;
		
		if(itemName === name){
			return true;
		}
	}
	

	return false;
}

function updateCartTotal(){
	// Get price of all in list
	const items = shoppingList.querySelectorAll("li");
	let total = 0;
	items.forEach((item) => {
		let priceString = item.querySelector(".price").textContent;
		let quantityString = item.querySelector(".quantity").textContent;
		let quantity = Number(quantityString);
		let priceNumber = priceString.slice(1);


		total += parseFloat(priceNumber) * quantity; 
	})

	document.querySelector(".cart span").textContent = "$" + total;

}