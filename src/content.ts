
function paymentRoutine(): void
{
	let itemLookup = document.getElementById('itemLookup');
	const parent = itemLookup.parentElement;

	const reinput = () =>
	{
		console.log('hek');

		const quickInput =
		`
		<input class="field ac_field" type="text" id="item_name" 
		onfocus="shopItemFieldOnFocus(this, 'item_id');" value="" autocomplete="on"
		onkeydown="if(event.keyCode === 13)
		{
			showResources($(POSMenu.formId),
				'https://ic.clubautomation.com/payment/right-side-view?add_item=1&amp;add_item_by_id=1&amp;' + $(this.form).serialize(),
				'pos_right_block'
			);
			
		}">
		`;
		//POSMenu.isInitialised = false;
		//closeModalForm();
		itemLookup = document.getElementById('itemLookup');

		mut.disconnect();

		if(itemLookup) itemLookup.remove();
		
		parent.innerHTML += quickInput;

		(<HTMLElement>parent.children[1]).focus();

		mut.observe(parent, {childList: true});
	};

	const mut = new MutationObserver(reinput);

	mut.observe(parent, {childList: true});

	reinput();
}

function checkinRoutine(): void
{
	const CheckoutUrl = 'https://ic.clubautomation.com/payment?user_id=';

	const middle = document.getElementById('checkin-middle');

	const mut = new MutationObserver(() =>
	{
		/* only create the checkout option if the user is a member */
		let error = document.getElementById('checkin-error');
		console.log(error);
		if (error.children.length === 1)
		{
			return;
		}

		const uid = <HTMLInputElement>document.getElementById('user_id');

		const link = CheckoutUrl + uid.value;

		const uinf = document.getElementById('user-info');

		const linkElement = document.createElement('a');
		linkElement.textContent = 'Checkout';
		const style = linkElement.style;

		style.width = 'max-content';
		style.height = '20px';
		style.lineHeight = '20px';
		style.fontSize = '20px';
		style.display = 'block';
		style.position = 'relative';

		linkElement.href = link;

		uinf.children[1].appendChild(linkElement);
	});

	mut.observe(middle, {childList: true});
}

function checkURL(
	url: string,
	 mainCallback: () => void,
 	  payCallback: () => void,
	checkCallback: () => void
)
{
	if(url === 'https://ic.clubautomation.com/')
	{
		mainCallback();
	}

	if(url.includes('payment'))
	{
		payCallback();
	}

	if(url.includes('checkin'))
	{
		checkCallback();
	}
}

/* main pogam */

checkURL(window.location.href, () => {}, paymentRoutine, checkinRoutine);
