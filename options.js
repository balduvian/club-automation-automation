var base = document.body;
var holders = [];

var on = true;

function createDiv(parent, className)
{
    let div = document.createElement("div");
    div.className = className;
    parent.appendChild(div);
    return div;
}

function createPar(parent, className, text)
{
    let div = document.createElement("p");
    div.className = className;
    div.textContent = text;
    parent.appendChild(div);
    return div;
}

function giveAnimation(div, animName) {
    div.classList.remove(animName);
    void div.offsetWidth;
    div.classList.add(animName);
}

class Holder
{
    constructor(parent)
    {
        this.holder = createDiv(parent, "holder")
        this.label = createPar(this.holder, "label", "turn on");
        this.switch = createDiv(this.holder, "switchBack");

    }
}

let main = function()
{
    chrome.storage.local.get({key: value}, () => {
        on = value;
    });
    switchOn = chrome.storage
    holders.push(new Holder(base));
    holders.push(new Holder(base));
}

main();