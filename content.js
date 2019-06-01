/*
<input class="field ac_field" type="text" id="item_name" onfocus="shopItemFieldOnFocus(this, 'item_id');" value="" autocomplete="off">
*/

/*
this.delLink.onclick = function() {
                        if (confirm("Remove this item from the shopping cart?")) {
                            POSMenu.isInitialised = false;
                            showResources(h, l + "payment/right-side-view?del=" + g.id + "", "pos_right_block")
                        }
					}
					*/

const PAGE_MAIN = 0;
const PAGE_CHECKOUT = 1;



function findDeleteButton()
{	
	function sleep(milliseconds) {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}

	sleep(1000).then(() =>
	{
		let possible = document.getElementsByTagName("a");
		let button = null;

		console.log(possible);

		for(let i = 0; i < possible; ++i)
		{
			if(possible[i].textContent === "Delete")
			{
				button = possible[i];
				break;
			}
		}

		button.textContent = "Super";
	});
}

function createTextFunction(func)
{
	let str = func.toString();
	str = str.replace(/\n?\r|\n|	/g, "").replace(/\"/g, "'");
	return str.slice(str.indexOf("{"), str.length);
}

alert(createTextFunction(findDeleteButton));

function paymentRoutine()
{
	let lookupLink = document.getElementById("itemLookup");

	let itemParent = lookupLink.parentElement;

	itemParent.removeChild(lookupLink);

	itemParent.innerHTML += "<input class=\"field ac_field\" type=\"text\" id=\"item_name\" onfocus=\"shopItemFieldOnFocus(this, 'item_id');\" value=\"\" autocomplete=\"off\">";

	itemParent.innerHTML += "<input type=\"button\" class=\"button bold\" value=\"Add\" onclick=\"POSMenu.isInitialised = false; showResources($(POSMenu.formId), 'https://ic.clubautomation.com/payment/right-side-view?add_item=1&amp;add_item_by_id=1&amp;' + $(this.form).serialize() , 'pos_right_block'); " + createTextFunction(findDeleteButton) + "\">";//closeModalForm();

	let itemsTable = document.getElementById("items_table");

	console.log(itemsTable);

	window.addEventListener("DOMContentLoaded", (event) => {
		alert("hewwo");
	});

	itemsTable.addEventListener("load", (event) =>
	{
		//alert("hewwo");

		let list = itemsTable.childNodes;
		list.forEach((element) =>
		{
			if(element.textContent === "Delete")
			{
				element.textContent = "super";
			}
		});
	});
}

function checkURL()
{
	let url = window.location.href;

	if(url === "https://ic.clubautomation.com/")
	{
		return PAGE_MAIN;
	}

	if(url.includes("payment"))
	{
		return PAGE_CHECKOUT;
	}

	return id;
}

/* main pogam */

let pageID = checkURL();

switch(pageID) {
	case PAGE_MAIN:
		break;
	case PAGE_CHECKOUT:
		paymentRoutine();
		break;
}