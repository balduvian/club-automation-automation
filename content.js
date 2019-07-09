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
const PAGE_CHECKIN = 2;

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

//alert(createTextFunction(findDeleteButton));

function paymentRoutine()
{
	let lookupLink = document.getElementById("itemLookup");

	let itemParent = lookupLink.parentElement;

	itemParent.removeChild(lookupLink);

	itemParent.innerHTML += "<input class=\"field ac_field\" type=\"text\" id=\"item_name\" onfocus=\"shopItemFieldOnFocus(this, 'item_id');\" value=\"\" autocomplete=\"off\">";

	itemParent.innerHTML += "<input type=\"button\" class=\"button bold\" value=\"Add\" onclick=\"POSMenu.isInitialised = false; showResources($(POSMenu.formId), 'https://ic.clubautomation.com/payment/right-side-view?add_item=1&amp;add_item_by_id=1&amp;' + $(this.form).serialize() , 'pos_right_block'); " + createTextFunction(findDeleteButton) + "\">";//closeModalForm();

	//items table
	
	let itemsTable = document.getElementById("items_table");

	var config = { attributes: true, childList: true, subtree: true };

	var callback = function(mutationsList, observer) {
		for(var mutation of mutationsList) {
			if (mutation.type == 'childList') {
				let list = itemsTable.childNodes;
				list.forEach((element) =>
				{
					if(element.textContent === "Delete")
					{
						element.textContent = "super";
					}
				});
			}
			else if (mutation.type == 'attributes') {
				console.log('The ' + mutation.attributeName + ' attribute was modified.');
			}
		}
	};

	var observer = new MutationObserver(callback);

	observer.observe(itemsTable, config);
}

function checkinRoutine()
{
	let CheckoutUrl = 'https://ic.clubautomation.com/payment?user_id=';
	let middle = document.getElementById('checkin-middle');

	let settings = {childList: true};

	let mut = new MutationObserver((mutationsList, observer) =>
	{
		/* only create the checkout option if the user is a member */
		let error = document.getElementById('checkin-error');
		console.log(error);
		if (error.children.length === 1)
		{
			return;
		}

		let uid = document.getElementById('user_id');

		let link = CheckoutUrl + uid.value;

		let uinf = document.getElementById('user-info');

		let linkElement = document.createElement('a');
		linkElement.textContent = 'Checkout';
		let style = linkElement.style;

		style.width = 'max-content';
		style.height = '20px';
		style.lineHeight = '20px';
		style.fontSize = '20px';
		style.display = 'block';
		style.position = 'relative';

		linkElement.href = link;

		uinf.children[1].appendChild(linkElement);
	});

	mut.observe(middle, settings);
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

	if(url.includes('checkin'))
	{
		return PAGE_CHECKIN;
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
	case PAGE_CHECKIN:
		checkinRoutine();
		break;
}