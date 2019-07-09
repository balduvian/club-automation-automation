var base = document.body;
var holders = [];

var switchOn = true;

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

function createLink(parent, className, text, link) {
    let div = document.createElement("a");
    div.className = className;
    div.textContent = text;
    div.href = link;
    parent.appendChild(div);
    return div;
}

function giveAnimation(div, newA, oldA)
{
    div.classList.remove(newA);
    div.classList.remove(oldA);
    void div.offsetWidth;
    div.classList.add(newA);
}

async function refreshPage()
{
    chrome.tabs.getSelected(null, function(tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
    });
}

class Holder
{
    constructor(parent, labelName, type)
    {
        this.holder = createDiv(parent, "holder")
        this.label = createPar(this.holder, "label", labelName);
        switch(type)
        {
            case 0:
                this.switch = createDiv(this.holder, "switchBack");
                this.dot = createDiv(this.switch, "switchDot");
        
                this.holder.onclick = () => {
                    this.make();
                }
                break;
            case 1:
                this.button = createDiv(this.holder, "refreshButton");

                this.holder.onclick = () => {
                    refreshPage();
                }
                break;
        }
    }
    
    makeOn()
    {
        giveAnimation(this.switch, "switchBackAnimToOn", "switchBackAnimToOff");
        giveAnimation(this.dot, "switchDotAnimToOn", "switchDotAnimToOff");

        switchOn = true;
        set(true, ()=>{});
    }

    makeOff() 
    {
        giveAnimation(this.switch, "switchBackAnimToOff", "switchBackAnimToOn");
        giveAnimation(this.dot, "switchDotAnimToOff", "switchDotAnimToOn");

        switchOn = false;
        set(false, ()=>{});
    }

    make()
    {
        switchOn ? this.makeOff() : this.makeOn();
    }
}

async function get(callback)
{
    chrome.storage.local.get('on', (result) =>
    {
        callback(result);
    });
}

async function set(value, callback)
{
    chrome.storage.local.set({'on': value}, () => {
        get((result) => {
            alert(result);
        });
        callback();
    });
}

function checkForURL(ifYes, ifNo) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        url.startsWith('https://ic.clubautomation.com/') ? ifYes() : ifNo();
    });
}

function newTab(url, callback) {
    chrome.tabs.create({'url': chrome.extension.getURL(url)}, function(tab) {
        callback(tab);
    });
}

function generateDefault() {
    let defaultLabel = createPar(base, "defaultLabel", "not on C.A.");
    let link = createLink(base, "defaultLabel", "go there now", 'https://ic.clubautomation.com/');
    link.onclick = () => {newTab('https://ic.clubautomation.com/', (tab)=>{})};
}

function generateSpecial() {
    get((onValue) =>
    {
        switchOn = (onValue === true || onValue === false) ? onValue : true;

        holders.push(new Holder(base, "automating", 0));
        holders[0].make();

        holders.push(new Holder(base, "refresh", 1));
    });
}

/* begin */

checkForURL(generateSpecial, generateDefault);