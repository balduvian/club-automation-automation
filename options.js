var base = document.body;
var holders = [];

var auto_on = true;

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

function setOn(callback) {
    chrome.storage.local.get({on: value}, () => {
        on = value;
        callback();
    });
}

function getOn(callback) {
    chrome.storage.local.set('on', (result) => {
        callback(result);
    });
}

class Holder
{
    constructor(parent)
    {
        this.holder = createDiv(parent, "holder")
        this.label = createPar(this.holder, "label", "turn on");
        this.switch = createDiv(this.holder, "switchBack");
        this.dot = createDiv(this.switch, "switchDot");

        this.switch.onclick = () => {

        }
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