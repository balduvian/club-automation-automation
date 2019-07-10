"use strict";
function paymentRoutine() {
    let rightBlock = document.getElementById('pos_right_block');
    let itemLookup = document.getElementById('itemLookup');
    let parent = itemLookup.parentElement;
    const reinput = () => {
        console.log('hek');
        const quickInputText = `
		<input class="field ac_field" type="text" id="item_name_auto" 
		onfocus="shopItemFieldOnFocus(this, 'item_id');" value="" autocomplete="on"
		onkeydown="if(event.keyCode === 13)
		{
			setTimeout(() =>
			{
				showResources($(POSMenu.formId),
				'https://ic.clubautomation.com/payment/right-side-view?add_item=1&amp;add_item_by_id=1&amp;' + $(this.form).serialize(),
				'pos_right_block'
				);
			}, 100);	
		}
		POSMenu.isInitialised = false;
		closeModalForm();
		">
		`;
        itemLookup = document.getElementById('itemLookup');
        parent = itemLookup.parentElement;
        let greenButtons = document.getElementById('green_buttons');
        /* start modifying stuff */
        mut.disconnect();
        if (itemLookup)
            itemLookup.remove();
        parent.innerHTML += quickInputText;
        let quickInput = parent.children[1];
        let scanItem = document.getElementById('scanItem');
        scanItem.innerHTML = 'Item Name:';
        quickInput.focus();
        let gl = greenButtons.children;
        console.log(gl);
        for (let i = 0; i < 2; ++i) {
            gl[0].remove();
        }
        let paymentButton = gl[0];
        mut.observe(rightBlock, { childList: true, subtree: true });
        /* now we add the key shortcuts */
        window.onkeydown = (event) => {
            if (event.ctrlKey) {
                switch (event.keyCode) {
                    case 188: // comma key
                        paymentButton.click();
                        break;
                    case 191: // slash key
                        quickInput.focus();
                        break;
                }
            }
        };
    };
    const mut = new MutationObserver(reinput);
    mut.observe(rightBlock, { childList: true, subtree: true });
    reinput();
    const popMut = new MutationObserver(() => {
        /* check if the take payment popup has come up */
        let isPayment = document.getElementById('take_payment');
        if (!isPayment)
            return;
        /* check if house charge is avaliable */
        let isHouseCharge = document.getElementById('typeButton2');
        if (!isHouseCharge) {
            //probably put up something saying no house charge
            return;
        }
        /* disconnect observer so we can change things */
        popMut.disconnect();
        /* inject script */
        let sc = document.createElement('script');
        sc.innerHTML = 'POSMenu.selectPaymentType(2, false)';
        document.body.appendChild(sc);
        sc.remove();
        /* click pay button and we good */
        let payButton = document.getElementById('payButton');
        payButton.click();
        /* re-observe */
        //popMut.observe(document.body, {childList: true, subtree: true});
    });
    popMut.observe(document.body, { childList: true, subtree: true });
}
function checkinRoutine() {
    const CheckoutUrl = 'https://ic.clubautomation.com/payment?user_id=';
    const middle = document.getElementById('checkin-middle');
    const mut = new MutationObserver(() => {
        /* only create the checkout option if the user is a member */
        let error = document.getElementById('checkin-error');
        console.log(error);
        if (error.children.length === 1) {
            return;
        }
        const uid = document.getElementById('user_id');
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
    mut.observe(middle, { childList: true });
}
function checkURL(url, mainCallback, payCallback, checkCallback) {
    if (url === 'https://ic.clubautomation.com/') {
        mainCallback();
    }
    if (url.includes('payment')) {
        payCallback();
    }
    if (url.includes('checkin')) {
        checkCallback();
    }
}
/* main pogam */
checkURL(window.location.href, () => { }, paymentRoutine, checkinRoutine);
